const Router = require('koa-router');
const Player = require('../models/player');
const Game = require('../models/game');

function validateId(id) {
  const num = Number(id);
  return Number.isInteger(num) && num > 0;
}

const router = new Router({ prefix: '/players' });

// list all players
router.get('/', async ctx => {
  ctx.body = await Player.findAll();
});

// get player by id
router.get('/:id', async ctx => {
  if (!validateId(ctx.params.id)) { ctx.status = 400; return; }
  const player = await Player.findByPk(ctx.params.id);
  if (!player) { ctx.status = 404; return; }
  ctx.body = player;
});

// create player (requires gameId and name)
router.post('/', async ctx => {
  const { name, gameId } = ctx.request.body;
  if (!name || !validateId(gameId)) { ctx.status = 400; return; }
  const game = await Game.findByPk(gameId);
  if (!game) { ctx.status = 404; return; }
  const player = await Player.create({ name, gameId });
  ctx.status = 201;
  ctx.body = player;
});

// update player
router.put('/:id', async ctx => {
  if (!validateId(ctx.params.id)) { ctx.status = 400; return; }
  const player = await Player.findByPk(ctx.params.id);
  if (!player) { ctx.status = 404; return; }
  const { name, position } = ctx.request.body;
  if (name) player.name = name;
  if (validateId(position)) player.position = position;
  await player.save();
  ctx.body = player;
});

// delete player
router.delete('/:id', async ctx => {
  if (!validateId(ctx.params.id)) { ctx.status = 400; return; }
  const player = await Player.findByPk(ctx.params.id);
  if (!player) { ctx.status = 404; return; }
  await player.destroy();
  ctx.status = 204;
});

module.exports = router;
