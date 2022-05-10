"use strict";

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
    await queryInterface.bulkInsert("item_types", [
      {
        item_type_name: "Glucose",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        item_type_name: "Cooking Oil",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        item_type_name: "Flour",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("item_types", null, {});
  },
};
