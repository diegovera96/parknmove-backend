"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("parkings_users", {
      parkings_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "parkings", // Nombre de la tabla en minúsculas y en plural
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      users_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Nombre de la tabla en minúsculas y en plural
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      total_price: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("parkings_users");
  },
};
