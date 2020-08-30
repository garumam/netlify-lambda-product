const Sequelize = require('sequelize');

const Sale = require('../models/Sale');
const Product = require('../models/Product');
const Payment = require('../models/Payment');

const databaseConfig = require('../config/database');

const models = [Sale, Product, Payment];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig.url, databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

module.exports = new Database();