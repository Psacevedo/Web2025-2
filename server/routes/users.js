const Router = require('koa-router');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

function validateId(id) {
  const num = Number(id);
  return Number.isInteger(num) && num > 0;
}

const router = new Router({ prefix: '/users' });

// list all users (admin only)
router.get('/', async ctx => {
  if (ctx.state.user.role !== 'admin') { ctx.status = 403; return; }
  try {
    const users = await User.findAll({ attributes: ['id', 'email', 'role'] });
    ctx.body = users;
  } catch {
    ctx.status = 500;
  }
});

// get user by id (admin or self)
router.get('/:id', async ctx => {
  if (!validateId(ctx.params.id)) { ctx.status = 400; return; }
  if (ctx.state.user.role !== 'admin' && ctx.state.user.id != ctx.params.id) {
    ctx.status = 403; return; }
  try {
    const user = await User.findByPk(ctx.params.id, { attributes: ['id', 'email', 'role'] });
    if (!user) { ctx.status = 404; return; }
    ctx.body = user;
  } catch {
    ctx.status = 500;
  }
});

// create user (admin only)
router.post('/', async ctx => {
  if (ctx.state.user.role !== 'admin') { ctx.status = 403; return; }
  const { email, password, role } = ctx.request.body;
  if (!email || !password) { ctx.status = 400; return; }
  try {
    const passwordHash = bcrypt.hashSync(password, 8);
    const user = await User.create({ email, passwordHash, role: role || 'user' });
    ctx.status = 201;
    ctx.body = { id: user.id, email: user.email, role: user.role };
  } catch {
    ctx.status = 400;
  }
});

// update user (admin only)
router.put('/:id', async ctx => {
  if (!validateId(ctx.params.id)) { ctx.status = 400; return; }
  if (ctx.state.user.role !== 'admin') { ctx.status = 403; return; }
  const { email, password, role } = ctx.request.body;
  try {
    const user = await User.findByPk(ctx.params.id);
    if (!user) { ctx.status = 404; return; }
    if (email) user.email = email;
    if (password) user.passwordHash = bcrypt.hashSync(password, 8);
    if (role) user.role = role;
    await user.save();
    ctx.body = { id: user.id, email: user.email, role: user.role };
  } catch {
    ctx.status = 500;
  }
});

// delete user (admin only)
router.delete('/:id', async ctx => {
  if (!validateId(ctx.params.id)) { ctx.status = 400; return; }
  if (ctx.state.user.role !== 'admin') { ctx.status = 403; return; }
  try {
    const user = await User.findByPk(ctx.params.id);
    if (!user) { ctx.status = 404; return; }
    await user.destroy();
    ctx.status = 204;
  } catch {
    ctx.status = 500;
  }
});

module.exports = router;
