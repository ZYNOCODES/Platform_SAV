const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const Product = sequelize.define('products', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  ReferanceProduit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},{
  timestamps: true,
});

module.exports = Product;
