import Router from 'koa-router';
import Game from '../models/game.js';
import Player from '../models/player.js';
import { applyMove } from '../utils/gameLogic.js';

function validateId(id) {
  const num = Number(id);
  return Number.isInteger(num) && num > 0;
}

const router = new Router({ prefix: '/games' });

// Create a new game
router.post('/', async(ctx) => {
  try {
    const { name, maxPlayers, boardSize } = ctx.request.body;
    const game = await Game.create({
      name: name || 'Partida de Escaleras y Serpientes',
      maxPlayers: maxPlayers || 4,
      boardSize: boardSize || 100,
      status: 'waiting',
      gameData: {
        players: [],
        board: {},
        currentPlayer: null,
        moves: [],
      },
    });
    ctx.status = 201;
    ctx.body = game;
  } catch (error) {
    console.error('Error creating game:', error);
    ctx.status = 500;
    ctx.body = { error: 'error creating game' };
  }
});

// List all games
router.get('/', async(ctx) => {
  try {
    const games = await Game.findAll({
      include: [{ model: Player, as: 'players' }],
      order: [['createdAt', 'DESC']],
    });
    ctx.body = games;
  } catch (error) {
    console.error('Error fetching games:', error);
    ctx.status = 500;
    ctx.body = { error: 'Error fetching games' };
  }
});

// Get games for a specific user
router.get('/user/:userId', async(ctx) => {
  try {
    const { userId } = ctx.params;
    const games = await Game.findAll({
      include: [{
        model: Player,
        as: 'players',
        where: { userId }, // Asumiendo que Player tiene userId
        required: true,
      }],
      order: [['createdAt', 'DESC']],
    });
    ctx.body = games;
  } catch (error) {
    console.error('Error fetching user games:', error);
    ctx.status = 500;
    ctx.body = { error: 'Error fetching user games' };
  }
});

// Update game status
router.put('/:gameId', async(ctx) => {
  if (!validateId(ctx.params.gameId)) { ctx.status = 400; return; }
  const { status } = ctx.request.body;
  try {
    const game = await Game.findByPk(ctx.params.gameId);
    if (!game) { ctx.status = 404; return; }
    if (status) game.status = status;
    await game.save();
    ctx.body = game;
  } catch {
    ctx.status = 500;
  }
});

// Delete a game (admin only)
router.delete('/:gameId', async(ctx) => {
  if (!validateId(ctx.params.gameId)) { ctx.status = 400; return; }
  if (ctx.state.user.role !== 'admin') { ctx.status = 403; return; }
  try {
    const game = await Game.findByPk(ctx.params.gameId);
    if (!game) { ctx.status = 404; return; }
    await game.destroy();
    ctx.status = 204;
  } catch {
    ctx.status = 500;
  }
});

router.post('/:gameId/players', async(ctx) => {
  if (!validateId(ctx.params.gameId)) { ctx.status = 400; return; }
  const { name, userId } = ctx.request.body;
  if (!name || !userId) {
    ctx.status = 400;
    ctx.body = { error: 'name and userId required' };
    return;
  }
  try {
    const game = await Game.findByPk(ctx.params.gameId, {
      include: [{ model: Player, as: 'players' }],
    });
    if (!game) { ctx.status = 404; return; }

    // Verificar que el usuario no esté ya en la partida
    const existingPlayer = game.players.find(p => p.userId === userId);
    if (existingPlayer) {
      ctx.status = 400;
      ctx.body = { error: 'User already in this game' };
      return;
    }

    // Verificar límite de jugadores
    if (game.players.length >= game.maxPlayers) {
      ctx.status = 400;
      ctx.body = { error: 'Game is full' };
      return;
    }

    const player = await Player.create({
      name,
      userId,
      gameId: game.id,
    });
    ctx.status = 201;
    ctx.body = player;
  } catch (error) {
    console.error('Error adding player:', error);
    ctx.status = 500;
    ctx.body = { error: 'Error adding player' };
  }
});

router.post('/:gameId/roll', async(ctx) => {
  if (!validateId(ctx.params.gameId)) { ctx.status = 400; return; }
  const { playerId, roll } = ctx.request.body;
  if (!validateId(playerId) || !validateId(roll) || roll < 1 || roll > 6) {
    ctx.status = 400; ctx.body = { error: 'invalid input' }; return; }
  try {
    const player = await Player.findByPk(playerId);
    if (!player) { ctx.status = 404; return; }
    if (player.gameId != ctx.params.gameId) { ctx.status = 400; return; }
    const newPos = applyMove(player.position, roll);
    player.position = newPos;
    await player.save();
    ctx.body = { position: player.position };
  } catch {
    ctx.status = 500;
  }
});

router.get('/:gameId', async(ctx) => {
  if (!validateId(ctx.params.gameId)) { ctx.status = 400; return; }
  try {
    const game = await Game.findByPk(ctx.params.gameId, {
      include: [{ model: Player, as: 'players' }],
    });
    if (!game) { ctx.status = 404; return; }
    ctx.body = game;
  } catch (error) {
    console.error('Error fetching game:', error);
    ctx.status = 500;
    ctx.body = { error: 'Error fetching game' };
  }
});

export default router;
