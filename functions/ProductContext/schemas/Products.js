const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const schema = new Schema({
  name: String,
  qtd: Number,
  isActive: { type: Boolean, default: true, select: false },
  price: Number,
  picture: String,
  detail: String
});

schema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = schema;