import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js';

class Game extends Model {}

Game.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Partida de Escaleras y Serpientes',
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'waiting',
    validate: {
      isIn: [['waiting', 'in-progress', 'finished']],
    },
  },
  currentPlayerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  maxPlayers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 4,
  },
  boardSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100,
  },
  gameData: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('gameData');
      return rawValue ? JSON.parse(rawValue) : {};
    },
    set(value) {
      this.setDataValue('gameData', JSON.stringify(value));
    },
  },
}, { sequelize, modelName: 'game' });

export default Game;
