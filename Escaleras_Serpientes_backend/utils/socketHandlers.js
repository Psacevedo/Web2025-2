import Game from '../models/game.js';
import Player from '../models/player.js';
import { applyMove } from './gameLogic.js';

const socketState = {
  games: new Map(),
  playerSockets: new Map(),
  userGames: new Map(),
  userSockets: new Map(),
};

export function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on('authenticate', (data) => {
      const { userId, token } = data;

      socket.userId = userId;
      console.log(`Usuario autenticado: ${userId} en socket ${socket.id}`);

      if (!socketState.userSockets.has(userId)) {
        socketState.userSockets.set(userId, new Set());
      }
      socketState.userSockets.get(userId).add(socket.id);

      socket.emit('authenticated', { success: true });
    });

    socket.on('joinGame', async(data) => {
      const { gameId, userId } = data;

      try {
        const game = await Game.findByPk(gameId, {
          include: [{ model: Player, as: 'players' }],
        });

        if (!game) {
          socket.emit('error', { message: 'Juego no encontrado' });
          return;
        }

        let player = game.players.find(p => p.userId === userId);

        if (!player) {
          if (game.players.length >= game.maxPlayers) {
            socket.emit('error', { message: 'Juego lleno' });
            return;
          }

          player = await Player.create({
            name: `Jugador ${userId}`,
            userId,
            gameId,
            position: 0,
          });
        }

        socket.join(`game-${gameId}`);

        if (!socketState.games.has(gameId)) {
          socketState.games.set(gameId, {
            players: new Set(),
            gameData: game.toJSON(),
          });
        }

        const socketStateData = socketState.games.get(gameId);
        socketStateData.players.add(socket.id);

        socketState.playerSockets.set(socket.id, { userId, gameId });

        if (!socketState.userGames.has(userId)) {
          socketState.userGames.set(userId, new Set());
        }
        socketState.userGames.get(userId).add(gameId);

        console.log(`Usuario ${userId} se unió a la partida ${gameId}`);

        io.to(`game-${gameId}`).emit('playerJoined', {
          gameId,
          userId,
          playerName: player.name,
          playersCount: socketStateData.players.size,
        });

        // Enviar estado actual del juego
        const currentGame = await Game.findByPk(gameId, {
          include: [{ model: Player, as: 'players' }],
        });
        socket.emit('socketState', currentGame.toJSON());
      } catch (error) {
        console.error('Error joining game:', error);
        socket.emit('error', { message: 'Error al unirse al juego' });
      }
    });

    // Realizar jugada
    socket.on('makeMove', async(data) => {
      const { gameId, roll } = data;
      const playerInfo = socketState.playerSockets.get(socket.id);

      if (!playerInfo || playerInfo.gameId !== gameId) {
        socket.emit('error', { message: 'No autorizado para esta partida' });
        return;
      }

      try {
        // Buscar el jugador en la base de datos
        const player = await Player.findOne({
          where: {
            userId: playerInfo.userId,
            gameId,
          },
        });

        if (!player) {
          socket.emit('error', { message: 'Jugador no encontrado' });
          return;
        }

        // Aplicar la lógica del juego
        const newPosition = applyMove(player.position, roll);

        // Actualizar posición en la base de datos
        player.position = newPosition;
        await player.save();

        const moveResult = {
          playerId: player.id,
          userId: playerInfo.userId,
          playerName: player.name,
          roll,
          oldPosition: player.position - roll < 0 ? 0 : player.position - roll,
          newPosition,
          timestamp: new Date(),
        };

        console.log(`Jugada realizada en partida ${gameId}:`, moveResult);

        // Emitir a todos los jugadores de la partida
        io.to(`game-${gameId}`).emit('moveResult', {
          gameId,
          move: moveResult,
        });

        // Verificar si el jugador ganó
        if (newPosition >= 100) {
          io.to(`game-${gameId}`).emit('gameWon', {
            gameId,
            winner: {
              userId: playerInfo.userId,
              playerName: player.name,
            },
          });

          // Actualizar estado del juego
          const game = await Game.findByPk(gameId);
          if (game) {
            game.status = 'finished';
            await game.save();
          }
        }
      } catch (error) {
        console.error('Error making move:', error);
        socket.emit('error', { message: 'Error al realizar jugada' });
      }
    });

    // Obtener partidas del usuario
    socket.on('getUserGames', async(data) => {
      const { userId } = data;

      try {
        // Buscar juegos en la base de datos donde el usuario participa
        const games = await Game.findAll({
          include: [{
            model: Player,
            as: 'players',
            where: { userId },
            required: true,
          }],
          order: [['createdAt', 'DESC']],
        });

        const userGames = games.map(game => ({
          id: game.id,
          name: game.name,
          status: game.status,
          playersCount: game.players.length,
          maxPlayers: game.maxPlayers,
          createdAt: game.createdAt,
        }));

        socket.emit('userGames', userGames);
      } catch (error) {
        console.error('Error fetching user games:', error);
        socket.emit('error', { message: 'Error al obtener juegos del usuario' });
      }
    });

    // Salir de una partida
    socket.on('leaveGame', (data) => {
      const { gameId } = data;
      const playerInfo = socketState.playerSockets.get(socket.id);

      if (playerInfo && playerInfo.gameId === gameId) {
        const game = socketState.games.get(gameId);
        if (game) {
          game.players.delete(socket.id);
          socket.leave(`game-${gameId}`);

          // Notificar a otros jugadores
          io.to(`game-${gameId}`).emit('playerLeft', {
            gameId,
            userId: playerInfo.userId,
            playersCount: game.players.size,
          });

          console.log(`Usuario ${playerInfo.userId} salió de la partida ${gameId}`);
        }
      }
    });

    // Desconexión
    socket.on('disconnect', () => {
      const playerInfo = socketState.playerSockets.get(socket.id);

      if (playerInfo) {
        const { userId, gameId } = playerInfo;
        const game = socketState.games.get(gameId);

        if (game) {
          game.players.delete(socket.id);

          // Notificar desconexión
          io.to(`game-${gameId}`).emit('playerDisconnected', {
            gameId,
            userId,
            playersCount: game.players.size,
          });
        }

        // Limpiar mapas de seguimiento
        socketState.playerSockets.delete(socket.id);

        // Remover socket del usuario
        if (socketState.userSockets.has(userId)) {
          socketState.userSockets.get(userId).delete(socket.id);
          if (socketState.userSockets.get(userId).size === 0) {
            socketState.userSockets.delete(userId);
          }
        }
      }

      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });
}

export { socketState as socketState };
