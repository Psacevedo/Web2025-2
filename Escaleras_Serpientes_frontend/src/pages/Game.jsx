import { useEffect, useState } from 'react';
import Board from '../components/Board.jsx';
import { useAuth } from '../AuthContext.jsx';
import { API_URL } from '../config.js';

export default function Game() {
  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const { user } = useAuth();
  const [rolling, setRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState(null);
  const [gameStatus, setGameStatus] = useState('');

  useEffect(() => {
    async function startGame() {
      try {
        const resGame = await fetch(`${API_URL}/games`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const createdGame = await resGame.json();
        setGame(createdGame);

        const resPlayer = await fetch(`${API_URL}/games/${createdGame.id}/players`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
          body: JSON.stringify({ 
            name: user.email.split('@')[0],
            userId: user.userId 
          })
        });
        const newPlayer = await resPlayer.json();
        setPlayers([newPlayer]);
        setGameStatus(`¡Bienvenido ${newPlayer.name}! Lanza el dado para comenzar.`);
      } catch (err) {
        console.error('Error starting game', err);
        setGameStatus('Error al iniciar el juego. Por favor, inicia sesión primero.');
      }
    }
    if (user && user.token) {
      startGame();
    }
  }, [user]);

  async function handleRoll() {
    if (rolling || players.length === 0) return;
    setRolling(true);
    const roll = Math.floor(Math.random() * 6) + 1;
    setLastRoll(roll);
    
    try {
      const res = await fetch(`${API_URL}/games/${game.id}/roll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ playerId: players[0].id, roll })
      });
      if (res.ok) {
        const data = await res.json();
        const newPosition = data.position;
        setPlayers([{ ...players[0], position: newPosition }]);
        
        // Check for win condition
        if (newPosition >= 100) {
          setGameStatus(`🎉 ¡Felicitaciones! ¡Has ganado el juego!`);
        } else {
          // Check for special moves
          const oldPosition = players[0].position || 0;
          if (newPosition > oldPosition + roll) {
            setGameStatus(`🪜 ¡Escalera! Desde ${oldPosition + roll} hasta ${newPosition}`);
          } else if (newPosition < oldPosition + roll) {
            setGameStatus(`🐍 ¡Serpiente! Desde ${oldPosition + roll} hasta ${newPosition}`);
          } else {
            setGameStatus(`Dado: ${roll} - Posición: ${newPosition}`);
          }
        }
      }
    } catch (err) {
      console.error('roll failed', err);
      setGameStatus('Error al lanzar el dado.');
    } finally {
      setRolling(false);
    }
  }

  if (!user || !user.token) {
    return (
      <section style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>🎮 Escaleras y Serpientes</h2>
        <p>Debes iniciar sesión para jugar.</p>
      </section>
    );
  }

  if (!game) {
    return (
      <section style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>🎮 Iniciando juego...</h2>
        <div className="spinner">⏳</div>
      </section>
    );
  }

  return (
    <section style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h2>🎮 Escaleras y Serpientes - Juego #{game.id}</h2>
        <div style={{ 
          background: '#f0f0f0', 
          padding: '1rem', 
          borderRadius: '8px',
          margin: '1rem 0',
          fontSize: '1.1rem'
        }}>
          {gameStatus}
        </div>
        
        {players.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <p><strong>Jugador:</strong> {players[0].name}</p>
            <p><strong>Posición:</strong> {players[0].position || 0}/100</p>
            {lastRoll && <p><strong>Último dado:</strong> 🎲 {lastRoll}</p>}
          </div>
        )}

        <button 
          onClick={handleRoll} 
          disabled={rolling || (players[0] && players[0].position >= 100)}
          style={{
            background: rolling ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            fontSize: '1.1rem',
            borderRadius: '8px',
            cursor: rolling ? 'not-allowed' : 'pointer',
            marginBottom: '2rem'
          }}
        >
          {rolling ? '🎲 Lanzando...' : '🎲 Lanzar Dado'}
        </button>
      </div>

      <Board players={players} />
    </section>
  );
}
