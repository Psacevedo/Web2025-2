const { DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize');
const Game = require('./game');

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

module.exports = Player;
