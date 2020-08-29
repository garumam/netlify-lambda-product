const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const schema = new Schema({
  name: String,
  isActive: Boolean,
  balance: Number,
  picture: String,
  detail: String
});

module.exports = schema;