const { Sequelize } = require('sequelize');
const DBURL = `mysql://${process.env.DB_USERNAME}
                    :${process.env.DB_PASSWORD}
                    @${process.env.DB_HOST}
                    :${process.env.PORT}
                    /${process.env.DB_DBNAME}`
const sequelize = new Sequelize(process.env.DB_DBNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

module.exports = sequelize;
