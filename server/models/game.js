import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js';

class Game extends Model {}

Game.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'waiting',
    validate: {
      isIn: [['waiting', 'in-progress', 'finished']]
    }
  }
}, { sequelize, modelName: 'game' });

export default Game;
