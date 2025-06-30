import { applyMove, BOARD_SIZE, LADDERS, SLIDES } from '../utils/gameLogic.js';

describe('Game Logic Tests', () => {
  
  test('applyMove should climb ladders correctly', () => {
    const position = 4;
    const roll = 0;
    const result = applyMove(position, roll);
    expect(result).toBe(14);
  });

  test('applyMove should slide down snakes correctly', () => {
    const position = 16;
    const roll = 0;
    const result = applyMove(position, roll);
    expect(result).toBe(6);
  });

  test('applyMove should not exceed board size', () => {
    const position = 98;
    const roll = 4;
    const result = applyMove(position, roll);
    expect(result).toBe(98);
  });

  test('applyMove should move normally when no special tiles', () => {
    const position = 50;
    const roll = 3;
    const result = applyMove(position, roll);
    expect(result).toBe(53);
  });

  test('applyMove should reach exactly 100 to win', () => {
    const position = 96;
    const roll = 4;
    const result = applyMove(position, roll);
    expect(result).toBe(100);
  });

  test('BOARD_SIZE should be 100', () => {
    expect(BOARD_SIZE).toBe(100);
  });

  test('LADDERS should contain expected values', () => {
    expect(LADDERS[4]).toBe(14);
    expect(LADDERS[28]).toBe(84);
  });

  test('SLIDES should contain expected values', () => {
    expect(SLIDES[16]).toBe(6);
    expect(SLIDES[98]).toBe(78);
  });
});
