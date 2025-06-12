import { useEffect, useState, useContext } from 'react';
import Board from '../components/Board.jsx';
import { AuthContext } from '../AuthContext.jsx';

export default function Game() {
  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function startGame() {
      try {
        const resGame = await fetch('http://localhost:3000/games', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const createdGame = await resGame.json();
        setGame(createdGame);

        const resPlayer = await fetch(`http://localhost:3000/games/${createdGame.id}/players`, {
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
