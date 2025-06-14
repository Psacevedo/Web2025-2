import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from './sequelize.js';

class User extends Model {
  validPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    allowNull: false,
    defaultValue: 'user'
  }
}, { sequelize, modelName: 'user' });

export default User;
