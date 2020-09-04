//import {Options} from 'sequelize';
require('dotenv').config();
const pg = require('pg');

module.exports = {
  url: process.env.DB_URL_SALE,
  options: {
    dialectModule: pg,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      underscoredall: true,
    },
  },
};
