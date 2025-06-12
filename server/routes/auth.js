import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const router = new Router({ prefix: '/auth' });
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

router.post('/signup', async (ctx) => {
  const { email, password, role } = ctx.request.body;
  if (!email || !password) { ctx.status = 400; return; }
  try {
    const passwordHash = bcrypt.hashSync(password, 8);
    const user = await User.create({ email, passwordHash, role: role || 'user' });
    ctx.status = 201;
    ctx.body = { id: user.id, email: user.email, role: user.role };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: 'could not create user' };
  }
});

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;
  if (!email || !password) { ctx.status = 400; return; }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.validPassword(password)) { ctx.status = 401; return; }
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    ctx.body = { token };
  } catch {
    ctx.status = 500;
  }
});

export { router, JWT_SECRET };
