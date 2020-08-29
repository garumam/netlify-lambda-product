require('dotenv').config();
const mongoose = require('mongoose');
const DBAbstract = require('./DBAbstract');
const productSchema = require('../schemas/Products');

module.exports = class ProductDB extends DBAbstract {
  constructor() {
    super();
  }

  async connection() {
    const conn = await mongoose.createConnection(process.env.DB_URL_PRODUCT, { useNewUrlParser: true, useUnifiedTopology: true });
    conn.model('Products', productSchema);
    return conn;
  }
}