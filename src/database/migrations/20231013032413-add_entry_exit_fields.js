'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('parkings_users', 'entry_time', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn('parkings_users', 'exit_time', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('parkings_users', 'entry_time');
    await queryInterface.removeColumn('parkings_users', 'exit_time');
  },
};