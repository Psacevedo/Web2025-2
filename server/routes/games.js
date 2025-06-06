const Router = require('koa-router');
const Game = require('../models/game');
const Player = require('../models/player');

const router = new Router();

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

router.post('/', async (ctx) => {
  const game = await Game.create({});
  ctx.body = game;
});

router.post('/:gameId/players', async (ctx) => {
  const { name } = ctx.request.body;
  const game = await Game.findByPk(ctx.params.gameId);
  if (!game) { ctx.status = 404; return; }
  const player = await Player.create({ name, gameId: game.id });
  ctx.body = player;
});

router.post('/:gameId/roll', async (ctx) => {
  const { playerId, roll } = ctx.request.body;
  const player = await Player.findByPk(playerId);
  if (!player) { ctx.status = 404; return; }
  if (player.gameId != ctx.params.gameId) { ctx.status = 400; return; }
  const newPos = applyMove(player.position, roll);
  player.position = newPos;
  await player.save();
  ctx.body = { position: player.position };
});

router.get('/:gameId', async (ctx) => {
  const game = await Game.findByPk(ctx.params.gameId, { include: Player });
  if (!game) { ctx.status = 404; return; }
  ctx.body = game;
});

module.exports = router;
