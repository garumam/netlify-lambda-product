import { Sequelize, Options } from 'sequelize';

import Sale from '../models/Sale';
import Product from '../models/Product';
import Payment from '../models/Payment';

import databaseConfig from '../config/database';

const models = [Sale, Product, Payment];

class Database {
  public connection: Sequelize;
  async init() {
    try {
      this.connection = new Sequelize(
        databaseConfig.url,
        databaseConfig.options as Options
      );
    } catch (err) {
      console.log('ERRO AO TENTAR CONECTAR', err);
    }

    models
      .map((model) => model.initModel(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );

    return this;
  }
}

export default Database;
