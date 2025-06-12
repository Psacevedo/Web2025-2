const LADDERS = {4:14, 9:31, 20:38, 28:84, 40:59, 63:81, 71:91};
const SLIDES = {
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
const BOARD_SIZE = 100;

function applyMove(position, roll) {
  let newPos = position + roll;
  if (newPos > BOARD_SIZE) return position; // can't move
  if (LADDERS[newPos]) newPos = LADDERS[newPos];
  if (SLIDES[newPos]) newPos = SLIDES[newPos];
  return newPos;
}

module.exports = { applyMove, BOARD_SIZE, LADDERS, SLIDES };
