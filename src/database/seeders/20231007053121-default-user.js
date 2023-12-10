"use strict";
var crypto = require("crypto");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Admin",
          lastname: "Admin",
          email: "admin@parknmove.com",
          password: crypto
            .createHmac("sha256", process.env.TOKEN_SECRET)
            .update("password")
            .digest("hex"),
          priority: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Usuario1",
          lastname: "Apellido1",
          email: "usuario1@example.com",
          password: crypto
            .createHmac("sha256", process.env.TOKEN_SECRET)
            .update("password")
            .digest("hex"),
          priority: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Usuario2",
          lastname: "Apellido2",
          email: "usuario2@example.com",
          password: crypto
            .createHmac("sha256", process.env.TOKEN_SECRET)
            .update("password")
            .digest("hex"),
          priority: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Usuario3",
          lastname: "Apellido3",
          email: "usuario3@example.com",
          password: crypto
            .createHmac("sha256", process.env.TOKEN_SECRET)
            .update("password")
            .digest("hex"),
          priority: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "parkings",
      [
        {
          admin_id: 1,
          name: "Estacionamiento Las Americas",
          address: "Calle 1 # 1-1",
          base_price: 100,
          floor_count: 2,
          places_per_floor: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "parkings_users",
      [
        {
          id: 1,
          parking_id: 1,
          user_id: 1,
          total_price: 2000,
          createdAt: new Date(),
          updatedAt: new Date(),
          entry_time: new Date(),
          exit_time: null,
          extra_fee: 500,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};