const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const databaseUrl = process.env.DATABASE_URL || 'sqlite::memory:';

const sequelize = new Sequelize(databaseUrl, {
  logging: false,
});

module.exports = sequelize;
