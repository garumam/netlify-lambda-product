import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  qtd: number;
  isActive: boolean;
  price: number;
  picture: string;
  detail: string;
}

const ProductSchema: Schema = new Schema({
  name: String,
  qtd: Number,
  isActive: { type: Boolean, default: true, select: false },
  price: Number,
  picture: String,
  detail: String,
});

ProductSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default ProductSchema;
