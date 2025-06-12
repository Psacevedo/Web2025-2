import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import dotenv from 'dotenv';
import sequelize from './models/sequelize.js';
import gameRoutes from './routes/games.js';
import playerRoutes from './routes/players.js';
import userRoutes from './routes/users.js';
import { router as authRoutes } from './routes/auth.js';
import requireAuth from './routes/authMiddleware.js';

dotenv.config();

const app = new Koa();
const router = new Router();

app.use(cors({ origin: 'http://localhost:5173' })); // <--- Usar cors ANTES de las rutas y bodyParser
app.use(bodyParser());

router.use(authRoutes.routes());
router.use(requireAuth());
router.use(gameRoutes.routes());
router.use(playerRoutes.routes());
router.use(userRoutes.routes());

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Database connection error:', err);
});
