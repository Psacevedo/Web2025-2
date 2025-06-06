const { DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize');

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

module.exports = Game;
