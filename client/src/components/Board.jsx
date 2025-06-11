import './Board.css';

const DEFAULT_LADDERS = {4:14, 9:31, 20:38, 28:84, 40:59, 63:81, 71:91};
const DEFAULT_SNAKES = {
  16: 6,
  47: 26,
  49: 11,
  56: 53,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  98: 78
};

export default function Board({ boardSize = 100, players = [], ladders = DEFAULT_LADDERS, snakes = DEFAULT_SNAKES }) {
  const cells = [];
  for (let i = 1; i <= boardSize; i++) {
    cells.push(i);
  }

  return (
    <div className="board">
      {cells.map((num) => {
        const ladderEnd = ladders[num];
        const snakeEnd = snakes[num];
        return (
          <div key={num} className={`cell ${ladderEnd ? 'ladder' : ''} ${snakeEnd ? 'snake' : ''}`}>
            {num}
            {ladderEnd && <span className="marker">⇧{ladderEnd}</span>}
            {snakeEnd && <span className="marker">⇩{snakeEnd}</span>}
            {players.map((p) => p.position === num ? (
              <span key={p.id} className="token">{p.name[0]}</span>
            ) : null)}
          </div>
        );
      })}
    </div>
  );
}
