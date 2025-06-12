import { useEffect, useState, useContext } from 'react';
import Board from '../components/Board.jsx';
import { AuthContext } from '../AuthContext.jsx';
import { API_URL } from '../config.js';

export default function Game() {
  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const { user } = useContext(AuthContext);
  const [rolling, setRolling] = useState(false);

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
          body: JSON.stringify({ name: 'Jugador' })
        });
        const newPlayer = await resPlayer.json();
        setPlayers([newPlayer]);
      } catch (err) {
        console.error('Error starting game', err);
      }
    }
    startGame();
  }, [user]);

  async function handleRoll() {
    if (rolling || players.length === 0) return;
    setRolling(true);
    const roll = Math.floor(Math.random() * 6) + 1;
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
        setPlayers([{ ...players[0], position: data.position }]);
      }
    } catch (err) {
      console.error('roll failed', err);
    } finally {
      setRolling(false);
    }
  }

  if (!game) {
    return (
      <section>
        <h2>Iniciando juego...</h2>
      </section>
    );
  }

  return (
    <section>
      <h2>Juego #{game.id}</h2>
      <Board players={players} />
      <button onClick={handleRoll} disabled={rolling}>Lanzar dado</button>
    </section>
  );
}
