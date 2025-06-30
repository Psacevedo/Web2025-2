import Router from 'koa-router';

const router = new Router();

const characters = [
  {
    'name': 'Player 1',
    'score': '1',
    'color': 'red',
  },
  {
    'name': 'Player 2',
    'score': '2',
    'color': 'blue',
  },
  {
    'name': 'Player 3',
    'score': '3',
    'color': 'green',
  },
];

router.get('characters.show', '/show', async(ctx) => {
  ctx.body = characters;
});

export default router;
