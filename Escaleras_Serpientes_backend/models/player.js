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
      len: [1, 50],
    },
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Email or user identifier',
  },
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  joinedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, { sequelize, modelName: 'player' });

// Establecer relaciones
Game.hasMany(Player, { as: 'players', foreignKey: 'gameId' });
Player.belongsTo(Game, { as: 'game', foreignKey: 'gameId' });

export default Player;
