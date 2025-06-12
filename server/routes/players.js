import Router from 'koa-router';
import Player from '../models/player.js';
import Game from '../models/game.js';

function validateId(id) {
  const num = Number(id);
  return Number.isInteger(num) && num > 0;
}

const router = new Router({ prefix: '/players' });

// list all players
router.get('/', async ctx => {
  try {
    ctx.body = await Player.findAll();
  } catch {
    ctx.status = 500;
  }
});

// get player by id
router.get('/:id', async ctx => {
  if (!validateId(ctx.params.id)) { ctx.status = 400; return; }
  try {
    const player = await Player.findByPk(ctx.params.id);
    if (!player) { ctx.status = 404; return; }
    ctx.body = player;
  } catch {
    ctx.status = 500;
  }
});

// create player (requires gameId and name)
router.post('/', async ctx => {
  const { name, gameId } = ctx.request.body;
  if (!name || !validateId(gameId)) { ctx.status = 400; return; }
  try {
    const game = await Game.findByPk(gameId);
    if (!game) { ctx.status = 404; return; }
    const player = await Player.create({ name, gameId });
    ctx.status = 201;
    ctx.body = player;
  } catch {
    ctx.status = 500;
  }
});

// update player
router.put('/:id', async ctx => {
  if (!validateId(ctx.params.id)) { ctx.status = 400; return; }
  try {
    const player = await Player.findByPk(ctx.params.id);
    if (!player) { ctx.status = 404; return; }
    const { name, position } = ctx.request.body;
    if (name) player.name = name;
    if (validateId(position)) player.position = position;
    await player.save();
    ctx.body = player;
  } catch {
    ctx.status = 500;
  }
});

// delete player
router.delete('/:id', async ctx => {
  if (!validateId(ctx.params.id)) { ctx.status = 400; return; }
  try {
    const player = await Player.findByPk(ctx.params.id);
    if (!player) { ctx.status = 404; return; }
    await player.destroy();
    ctx.status = 204;  } catch {
    ctx.status = 500;
  }
});

export default router;
