import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../SocketContext.jsx';
import { useAuth } from '../AuthContext.jsx';
import { API_URL } from '../config.js';
import Board from '../components/Board.jsx';

export default function MultiplayerGame() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { socket, joinGame, leaveGame, makeMove } = useSocket();
  const { user } = useAuth();
  
  const [gameState, setGameState] = useState(null);
  const [players, setPlayers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [gameLoaded, setGameLoaded] = useState(false);

  useEffect(() => {
    if (!gameId) return;
    
    const loadGameData = async () => {
      try {
        const response = await fetch(`${API_URL}/games/${gameId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (response.ok) {
          const game = await response.json();
          setGameState(game);
          setPlayers(game.players || []);
          setGameLoaded(true);
        } else {
          console.error('Error loading game');
          navigate('/lobby');
        }
      } catch (error) {
        console.error('Error loading game:', error);
        navigate('/lobby');
      }
    };
    
    loadGameData();
  }, [gameId, navigate]);

  useEffect(() => {
    if (!gameId || !socket || !user || !gameLoaded) return;

    joinGame(gameId);

    socket.on('gameState', (state) => {
      console.log('Game state received:', state);
      setGameState(state);
      if (state.players) {
        setPlayers(state.players);
      }
    });

    socket.on('playerJoined', (data) => {
      console.log('Player joined:', data);
      addMessage(`🎉 ${data.playerName || data.userId} se unió a la partida`);
      refreshPlayers();
    });

    socket.on('playerLeft', (data) => {
      addMessage(`👋 ${data.userId} salió de la partida`);
      refreshPlayers();
    });

    socket.on('moveResult', (data) => {
      console.log('Move result:', data);
      const { move } = data;
      setRolling(false);
      addMessage(`🎲 ${move.playerName} lanzó ${move.roll} y se movió de ${move.oldPosition} a ${move.newPosition}`);
      
      // Actualizar posición del jugador
      setPlayers(prevPlayers => 
        prevPlayers.map(player => 
          player.userId === move.userId 
            ? { ...player, position: move.newPosition }
            : player
        )
      );
    });

    socket.on('gameWon', (data) => {
      addMessage(`🏆 ¡${data.winner.playerName} ha ganado la partida!`);
    });

    socket.on('playerDisconnected', (data) => {
      addMessage(`📡 ${data.userId} se desconectó`);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
      addMessage(`❌ Error: ${error.message}`);
    });

    return () => {
      leaveGame(gameId);
      socket.off('gameState');
      socket.off('playerJoined');
      socket.off('playerLeft');
      socket.off('moveResult');
      socket.off('gameWon');
      socket.off('playerDisconnected');
      socket.off('error');
    };
  }, [gameId, socket, user, joinGame, leaveGame, gameLoaded]);

  // Función para refrescar la lista de jugadores
  const refreshPlayers = async () => {
    try {
      const response = await fetch(`${API_URL}/games/${gameId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const game = await response.json();
        setPlayers(game.players || []);
      }
    } catch (error) {
      console.error('Error refreshing players:', error);
    }
  };

  const addMessage = (message) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: message,
      timestamp: new Date().toLocaleTimeString(),
    }].slice(-10)); // Mantener solo los últimos 10 mensajes
  };

  const handleRoll = () => {
    if (rolling || !socket || !user) return;
    
    setRolling(true);
    const roll = Math.floor(Math.random() * 6) + 1;
    
    // El backend socket handler ahora maneja el roll directamente
    makeMove(gameId, null, roll);
    addMessage(`🎲 Lanzaste el dado: ${roll}`);
  };

  const handleLeaveGame = () => {
    leaveGame(gameId);
    navigate('/lobby');
  };

  if (!gameState) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        fontSize: '1.2rem',
      }}>
        🎮 Cargando partida...
      </div>
    );
  }

  return (
    <div style={{
      padding: '1rem',
      maxWidth: '1400px',
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        background: 'white',
        padding: '1rem',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <h1 style={{ margin: 0, color: '#333' }}>
          🎯 Partida #{gameId}
        </h1>
        <button
          onClick={handleLeaveGame}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          ❌ Salir
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: '2rem',
      }}>
        {/* Área principal del juego */}
        <div>
          <Board players={players} />
          
          {/* Controles del juego */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginTop: '1rem',
            textAlign: 'center',
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>
              🎲 Controles de Juego
            </h3>
            
            <button
              onClick={handleRoll}
              disabled={rolling}
              style={{
                background: rolling ? '#ccc' : 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '10px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: rolling ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {rolling ? '🎲 Lanzando...' : '🎲 Lanzar Dado'}
            </button>
          </div>
        </div>

        {/* Panel lateral */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Lista de jugadores */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>
              👥 Jugadores ({players.length})
            </h3>
            {players.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center' }}>
                Esperando jugadores...
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {players.map((player, index) => (
                  <div
                    key={player.id || index}
                    style={{
                      background: '#f8f9fa',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontWeight: 'bold' }}>
                      {player.name || `Jugador ${index + 1}`}
                    </span>
                    <span style={{ color: '#666' }}>
                      Pos: {player.position || 0}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Chat/Mensajes */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>
              💬 Actividad del Juego
            </h3>
            
            <div style={{
              flex: 1,
              overflowY: 'auto',
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '6px',
              fontSize: '0.9rem',
            }}>
              {messages.length === 0 ? (
                <p style={{ color: '#666', textAlign: 'center' }}>
                  Esperando actividad...
                </p>
              ) : (
                messages.map((message) => (
                  <div key={message.id} style={{ marginBottom: '0.5rem' }}>
                    <span style={{ color: '#666', fontSize: '0.8rem' }}>
                      {message.timestamp}
                    </span>
                    <br />
                    {message.text}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
