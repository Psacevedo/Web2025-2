import { useState, useEffect } from 'react';
import { useSocket } from '../SocketContext.jsx';
import { useAuth } from '../AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config.js';

export default function GameLobby() {
  const { connected, userGames, joinGame, refreshUserGames } = useSocket();
  const { user } = useAuth();
  const [newGameName, setNewGameName] = useState('');
  const [availableGames, setAvailableGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    refreshUserGames();
    loadAvailableGames();
  }, [refreshUserGames]);

  const loadAvailableGames = async () => {
    try {
      const response = await fetch(`${API_URL}/games`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const games = await response.json();
        const available = games.filter(game => 
          game.status !== 'finished' && 
          game.players.length < game.maxPlayers
        );
        setAvailableGames(available);
      }
    } catch (error) {
      console.error('Error loading available games:', error);
    }
  };

  const createNewGame = async () => {
    if (!newGameName.trim()) {
      alert('Por favor ingresa un nombre para la partida');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: newGameName,
          maxPlayers: 4,
          boardSize: 100,
        }),
      });

      if (response.ok) {
        const newGame = await response.json();
        
        const playerResponse = await fetch(`${API_URL}/games/${newGame.id}/players`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            name: user.email.split('@')[0],
            userId: user.userId,
          }),
        });

        if (playerResponse.ok) {
          setNewGameName('');
          joinGame(newGame.id);
          navigate(`/game/${newGame.id}`);
        } else {
          alert('Error al unirse a la partida creada');
        }
      } else {
        alert('Error al crear la partida');
      }
    } catch (error) {
      console.error('Error creando partida:', error);
      alert('Error al crear la partida');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGame = async (gameId) => {
    try {
      const response = await fetch(`${API_URL}/games/${gameId}/players`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: user.email.split('@')[0],
          userId: user.userId,
        }),
      });

      if (response.ok) {
        joinGame(gameId);
        navigate(`/game/${gameId}`);
      } else {
        const error = await response.json();
        alert(error.error || 'Error al unirse a la partida');
      }
    } catch (error) {
      console.error('Error joining game:', error);
      alert('Error al unirse a la partida');
    }
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#333',
      }}>
        🎮 Lobby de Partidas
      </h1>

      {/* Estado de conexión */}
      <div style={{
        background: connected ? '#d4edda' : '#f8d7da',
        color: connected ? '#155724' : '#721c24',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        textAlign: 'center',
      }}>
        {connected ? '🟢 Conectado al servidor' : '🔴 Desconectado del servidor'}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
      }}>
        {/* Crear nueva partida */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>
            ➕ Crear Nueva Partida
          </h2>
          
          <input
            type="text"
            value={newGameName}
            onChange={(e) => setNewGameName(e.target.value)}
            placeholder="Nombre de la partida"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e9ecef',
              borderRadius: '8px',
              fontSize: '1rem',
              marginBottom: '1rem',
            }}
          />
          
          <button
            onClick={createNewGame}
            disabled={loading || !connected}
            style={{
              width: '100%',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? '⏳ Creando...' : '🚀 Crear Partida'}
          </button>
        </div>

        {/* Partidas disponibles para unirse */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>
            🌍 Partidas Disponibles ({availableGames.length})
          </h2>
          
          {availableGames.length === 0 ? (
            <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
              No hay partidas disponibles para unirse.
              <br />
              ¡Crea una nueva!
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {availableGames.map((game) => (
                <div
                  key={game.id}
                  style={{
                    background: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #e9ecef',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <h3 style={{ margin: 0, color: '#333' }}>
                      {game.name}
                    </h3>
                    <p style={{ margin: 0, color: '#666' }}>
                      👥 {game.players.length}/{game.maxPlayers} jugadores | 📊 {game.status}
                    </p>
                  </div>
                  <button
                    onClick={() => handleJoinGame(game.id)}
                    style={{
                      background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    🚪 Unirse
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        {/* Mis partidas activas */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>
            🎯 Mis Partidas Activas ({userGames.length})
          </h2>
          
          {userGames.length === 0 ? (
            <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
              No tienes partidas activas.
              <br />
              ¡Crea una nueva para empezar!
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {userGames.map((game) => (
                <div
                  key={game.id}
                  style={{
                    background: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #e9ecef',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <h3 style={{ margin: 0, color: '#333' }}>
                      Partida #{game.id}
                    </h3>
                    <p style={{ margin: 0, color: '#666' }}>
                      👥 {game.playersCount} jugadores | 📊 {game.status}
                    </p>
                  </div>
                  <button
                    onClick={() => handleJoinGame(game.id)}
                    style={{
                      background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    🎮 Entrar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
