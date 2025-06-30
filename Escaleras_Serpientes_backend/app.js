import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import sequelize from './models/sequelize.js';
import gameRoutes from './routes/games.js';
import playerRoutes from './routes/players.js';
import userRoutes from './routes/users.js';
import characterRoutes from './routes/characters.js';
import { router as authRoutes } from './routes/auth.js';
import requireAuth from './routes/authMiddleware.js';
import { setupSocketHandlers } from './utils/socketHandlers.js';

dotenv.config();

const app = new Koa();
const router = new Router();

app.use(cors({
  origin: (ctx) => {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:3001'];
    const origin = ctx.header.origin;
    if (allowedOrigins.includes(origin)) {
      return origin;
    }
    return 'http://localhost:5173';
  },
}));
app.use(bodyParser());

router.use(authRoutes.routes());
router.use(requireAuth());
router.use(gameRoutes.routes());
router.use(playerRoutes.routes());
router.use(userRoutes.routes());
router.use(characterRoutes.routes());

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app.callback());
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
  },
});

setupSocketHandlers(io);

export { io };

sequelize.sync().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('WebSocket server ready');
  });
}).catch((err) => {
  console.error('Database connection error:', err);
});
