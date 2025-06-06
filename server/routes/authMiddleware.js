const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./auth');

module.exports = function(requiredRole) {
  return async (ctx, next) => {
    const authHeader = ctx.headers['authorization'];
    if (!authHeader) { ctx.status = 401; return; }
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      ctx.state.user = payload;
      if (requiredRole && payload.role !== requiredRole) {
        ctx.status = 403; return;
      }
      await next();
    } catch {
      ctx.status = 401;
    }
  };
};
