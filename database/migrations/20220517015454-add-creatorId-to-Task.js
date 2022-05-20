'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tasks', 'creatorId', {
      references: { model: 'Users', key: 'id' },
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tasks', 'creatorId')
  }
};
