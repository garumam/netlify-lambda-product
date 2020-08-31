const mongoose = require('mongoose');
const productSchema = require('../schemas/Products');
const databaseConfig = require('../config/database');

class Database {
  async init() {
    this.connection = await mongoose.createConnection(databaseConfig.url, databaseConfig.options);
    this.connection.model('Products', productSchema);
    return this;
  }
}

module.exports = Database;
