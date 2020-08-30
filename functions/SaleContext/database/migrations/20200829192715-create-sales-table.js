'use strict';
const DataTypes = require('sequelize').DataTypes;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('sales', {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false
        },
        total_price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
  },

  down: async (queryInterface) => {
    return await queryInterface.dropTable('sales');
  }
};
