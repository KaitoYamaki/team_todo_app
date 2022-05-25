'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      taskId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Tasks', key: 'id'}
      },
      creatorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id'}
      },
      message: {
        type: Sequelize.TEXT
      },
      kind: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};