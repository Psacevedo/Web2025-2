import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL || 'sqlite::memory:';

const sequelize = new Sequelize(databaseUrl, {
  logging: false,
});

export default sequelize;
