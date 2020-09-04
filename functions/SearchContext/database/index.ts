import mongoose from 'mongoose';
import ProductSchema, { IProduct } from '../schemas/Products';
import databaseConfig from '../config/database';

class Database {
  public connection: mongoose.Connection;

  async init() {
    this.connection = await mongoose.createConnection(
      databaseConfig.url,
      databaseConfig.options
    );
    this.connection.model<IProduct>('Products', ProductSchema);
    return this;
  }
}

export default Database;
