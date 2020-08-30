const Sequelize = require('sequelize');

class Product extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        name: Sequelize.STRING,
        code: Sequelize.STRING,
        price: Sequelize.DECIMAL(10, 2),
        sale_id: Sequelize.UUID
      },
      {
        sequelize,
        tableName: 'products',
        modelName: 'Product'
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Sale, { foreignKey: 'sale_id' });
  }
}

module.exports = Product;