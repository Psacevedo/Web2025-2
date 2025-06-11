import './Board.css';

export default function Board({ boardSize = 30, players = [] }) {
  const cells = [];
  for (let i = 1; i <= boardSize; i++) {
    cells.push(i);
  }

  return (
    <div className="board">
      {cells.map((num) => (
        <div key={num} className="cell">
          {num}
          {players.map((p) => p.position === num ? (
            <span key={p.id} className="token">{p.name[0]}</span>
          ) : null)}
        </div>
      ))}
    </div>
  );
}
