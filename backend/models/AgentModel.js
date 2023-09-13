const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Agent = sequelize.define('agentsagrees', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  Nom: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Prenom: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Region: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Telephone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Adresse: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Localisation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Local: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},{
  timestamps: true,
});

module.exports = Agent;
