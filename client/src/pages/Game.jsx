import { useEffect, useState } from 'react';
import Board from '../components/Board.jsx';
import { apiFetch } from '../api.js';

export default function Game() {
  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function startGame() {
      try {
        const resGame = await apiFetch('/games', { method: 'POST' });
        const createdGame = await resGame.json();
        setGame(createdGame);

        const resPlayer = await apiFetch(`/games/${createdGame.id}/players`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'Jugador' })
        });
        const newPlayer = await resPlayer.json();
        setPlayers([newPlayer]);
      } catch (err) {
        console.error('Error starting game', err);
      }
    }
    startGame();
  }, []);

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
    </section>
  );
}
