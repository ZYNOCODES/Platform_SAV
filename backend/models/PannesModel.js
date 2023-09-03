const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Panne = sequelize.define('pannes', {
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
  Telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ReferanceProduit: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  TypePanne: {
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
  DateDepot: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Progres: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},{
  timestamps: true,
});

module.exports = Panne;
