const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('streamdb', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
