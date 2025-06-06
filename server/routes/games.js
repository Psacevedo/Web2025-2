const Router = require('koa-router');
const Game = require('../models/game');
const Player = require('../models/player');

function validateId(id) {
  const num = Number(id);
  return Number.isInteger(num) && num > 0;
}

const router = new Router({ prefix: '/games' });

const LADDERS = {3:22, 5:8, 11:26, 20:29};
const SLIDES = {27:1, 21:9, 17:4, 19:7};
const BOARD_SIZE = 30;

function applyMove(position, roll) {
  let newPos = position + roll;
  if (newPos > BOARD_SIZE) return position; // can't move
  if (LADDERS[newPos]) newPos = LADDERS[newPos];
  if (SLIDES[newPos]) newPos = SLIDES[newPos];
  return newPos;
}

// Create a new game
router.post('/', async (ctx) => {
  try {
    const game = await Game.create({});
    ctx.status = 201;
    ctx.body = game;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'error creating game' };
  }
});

// List all games
router.get('/', async (ctx) => {
  try {
    const games = await Game.findAll();
    ctx.body = games;
  } catch {
    ctx.status = 500;
  }
});

// Update game status
router.put('/:gameId', async (ctx) => {
  if (!validateId(ctx.params.gameId)) { ctx.status = 400; return; }
  const { status } = ctx.request.body;
  try {
    const game = await Game.findByPk(ctx.params.gameId);
    if (!game) { ctx.status = 404; return; }
    if (status) game.status = status;
    await game.save();
    ctx.body = game;
  } catch {
    ctx.status = 500;
  }
});

// Delete a game (admin only)
router.delete('/:gameId', async (ctx) => {
  if (!validateId(ctx.params.gameId)) { ctx.status = 400; return; }
  if (ctx.state.user.role !== 'admin') { ctx.status = 403; return; }
  try {
    const game = await Game.findByPk(ctx.params.gameId);
    if (!game) { ctx.status = 404; return; }
    await game.destroy();
    ctx.status = 204;
  } catch {
    ctx.status = 500;
  }
});

router.post('/:gameId/players', async (ctx) => {
  if (!validateId(ctx.params.gameId)) { ctx.status = 400; return; }
  const { name } = ctx.request.body;
  if (!name) { ctx.status = 400; ctx.body = { error: 'name required' }; return; }
  try {
    const game = await Game.findByPk(ctx.params.gameId);
    if (!game) { ctx.status = 404; return; }
    const player = await Player.create({ name, gameId: game.id });
    ctx.status = 201;
    ctx.body = player;
  } catch {
    ctx.status = 500;
  }
});

router.post('/:gameId/roll', async (ctx) => {
  if (!validateId(ctx.params.gameId)) { ctx.status = 400; return; }
  const { playerId, roll } = ctx.request.body;
  if (!validateId(playerId) || !validateId(roll) || roll < 1 || roll > 6) {
    ctx.status = 400; ctx.body = { error: 'invalid input' }; return; }
  try {
    const player = await Player.findByPk(playerId);
    if (!player) { ctx.status = 404; return; }
    if (player.gameId != ctx.params.gameId) { ctx.status = 400; return; }
    const newPos = applyMove(player.position, roll);
    player.position = newPos;
    await player.save();
    ctx.body = { position: player.position };
  } catch {
    ctx.status = 500;
  }
});

router.get('/:gameId', async (ctx) => {
  if (!validateId(ctx.params.gameId)) { ctx.status = 400; return; }
  try {
    const game = await Game.findByPk(ctx.params.gameId, { include: Player });
    if (!game) { ctx.status = 404; return; }
    ctx.body = game;
  } catch {
    ctx.status = 500;
  }
});

module.exports = router;
