const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const Willaya = sequelize.define('wilayaofalgeria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Nom: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},{
  timestamps: true,
});

module.exports = Willaya;
