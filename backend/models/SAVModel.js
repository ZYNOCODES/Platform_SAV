const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const SAV = sequelize.define('sav', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  Region: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Telephone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Localisation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},{
  timestamps: true,
});

module.exports = SAV;
