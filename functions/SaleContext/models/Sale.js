const Sequelize = require('sequelize');

class Sale extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        total_price: Sequelize.DECIMAL(10, 2)
      },
      {
        sequelize,
        tableName: 'sales',
        modelName: 'Sale'
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Product, { foreignKey: 'sale_id', as: 'products' });
    this.hasOne(models.Payment, { foreignKey: 'sale_id', as: 'payment' });
  }
}

module.exports = Sale;