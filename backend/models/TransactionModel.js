const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const Transaction = sequelize.define('transactions', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  UserID: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  Action: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},{
  timestamps: true,
});

module.exports = Transaction;
