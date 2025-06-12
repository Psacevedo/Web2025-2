import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js';
import Game from './game.js';

class Player extends Model {}

Player.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 50]
    }
  },
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
}, { sequelize, modelName: 'player' });

Game.hasMany(Player);
Player.belongsTo(Game);

export default Player;
