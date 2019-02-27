import Sequelize from 'sequelize';
import sequelize from '../config/index';

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    get() {
      return this.getDataValue('id');
    },
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    get() {
      return this.getDataValue('username');
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('password');
    },
  },
});

User.sync({ force: true });

export default User;
