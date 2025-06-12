const test = require('node:test');
const assert = require('assert');
const { applyMove } = require('../utils/gameLogic');

test('applyMove climbs ladders', () => {
  assert.strictEqual(applyMove(0, 4), 14);
});

test('applyMove does not exceed board', () => {
  assert.strictEqual(applyMove(98, 4), 98);
});
