require('dotenv').config();
const mongoose = require('mongoose');
const productSchema = require('./Products');

module.exports = async function dbConnection() {
  const conn = await mongoose.createConnection(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  conn.model('Products', productSchema);
  return conn;
}