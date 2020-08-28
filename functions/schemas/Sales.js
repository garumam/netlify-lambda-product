const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Sales = mongoose.model('sales', Schema({}));
module.exports = Sales;