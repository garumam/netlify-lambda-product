'use strict';
const DataTypes = require('sequelize').DataTypes;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('products', {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        code: {
          type: Sequelize.STRING,
          allowNull: true
        },
        price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0
        },
        sale_id: {
          type: Sequelize.UUID,
          references: {
            model: 'sales',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          allowNull: true,
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
    return await queryInterface.dropTable('products');
  }
};
