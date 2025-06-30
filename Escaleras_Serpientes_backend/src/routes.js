import Router from 'koa-router';
import characters from '../routes/characters';

const router = new Router();

router.use('/characters', characters.routes()); //Todas las requests que partan por characters se van a ir al characters.js

export { router };
