'use strict';
const DataTypes = require('sequelize').DataTypes;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('payments', {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM,
          values: ['pending', 'approved', 'disapproved'],
          defaultValue: 'pending',
          allowNull: false
        },
        sale_id: {
          type: Sequelize.UUID,
          references: {
            model: 'sales',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
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
    return await queryInterface.dropTable('payments');
  }
};
