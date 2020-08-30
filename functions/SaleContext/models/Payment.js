const Sequelize = require('sequelize');

class Payment extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        status: {
          type: Sequelize.ENUM,
          values: ['pending', 'approved', 'disapproved'],
          defaultValue: 'pending'
        },
        sale_id: Sequelize.UUID
      },
      {
        sequelize,
        tableName: 'payments',
        modelName: 'Payment'
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Sale, { foreignKey: 'sale_id' });
  }
}

module.exports = Payment;