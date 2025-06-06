const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv');
const sequelize = require('./models/sequelize');
const gameRoutes = require('./routes/games');
const playerRoutes = require('./routes/players');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth').router;
const requireAuth = require('./routes/authMiddleware');

dotenv.config();

const app = new Koa();
const router = new Router();

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
