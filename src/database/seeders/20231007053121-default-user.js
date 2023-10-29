"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John",
          lastname: "Doe",
          email: "lol@gmail.com",
          password: "1234",
          priority: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Parkings",
      [
        {
          admin_id: 1,
          name: "Parking 1",
          address: "Calle 123",
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
      "Parkings_Users",
      [
        {
          parking_id: 1,
          user_id: 1,
          total_price: null,
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
