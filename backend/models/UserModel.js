const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  Nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Wilaya: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CentreDepot: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  timestamps: true,
});

module.exports = User;
