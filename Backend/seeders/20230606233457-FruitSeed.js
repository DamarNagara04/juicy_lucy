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
    const axios = require("axios");

    let query =
      "apple orange kiwi avocado strawberry Pineapple mango lemon cranberry watermelon Lychee grapes Pomegranate Peaches Blackberries Pears Banana Guava Lime Dragonfruit";

    const options = {
      method: "GET",
      url: "https://api.api-ninjas.com/v1/nutrition?query=" + query,
      headers: { "X-Api-Key": "HS3mQQzAs4xFaYY8zszb1g==IOtMAI66hVJSeXQO" },
    };

    try {
      const response = await axios.request(options);

      // console.log(response.data, "di seed>>>>>>>>>>>>..");

      const fruitData = response.data;

      fruitData.forEach((data) => {
        data.createdAt = new Date();
        data.updatedAt = new Date();
      });

      await queryInterface.bulkInsert("Fruits", fruitData, {});
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.status, error.response.data);
      } else {
        console.error("Request failed:", error.message);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Fruits", null, {});
  },
};
