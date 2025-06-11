import './Board.css';
import ladderImg from '../assets/sprites/ladder.svg';
import snakeImg from '../assets/sprites/snake.svg';
import tokenRed from '../assets/sprites/token-red.svg';
import tokenBlue from '../assets/sprites/token-blue.svg';

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
  const tokenImages = [tokenRed, tokenBlue];
  const cells = [];
  const size = Math.sqrt(boardSize);
  for (let row = size; row > 0; row--) {
    let rowCells = [];
    for (let col = 1; col <= size; col++) {
      const num = (row - 1) * size + col;
      rowCells.push(num);
    }
    if (row % 2 === 0) rowCells.reverse();
    cells.push(...rowCells);
  }

  return (
    <div className="board">
      {cells.map((num) => {
        const ladderEnd = ladders[num];
        const snakeEnd = snakes[num];
        return (
          <div key={num} className={`cell ${ladderEnd ? 'ladder' : ''} ${snakeEnd ? 'snake' : ''}`}>
            {num}
            {ladderEnd && <img src={ladderImg} className="sprite" alt="ladder" />}
            {snakeEnd && <img src={snakeImg} className="sprite" alt="snake" />}
            {players.map((p, idx) => p.position === num ? (
              <img
                key={p.id}
                src={tokenImages[idx % tokenImages.length]}
                className="token"
                alt={p.name}
              />
            ) : null)}
          </div>
        );
      })}
    </div>
  );
}
