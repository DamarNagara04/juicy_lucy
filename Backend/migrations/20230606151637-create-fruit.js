"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Fruits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      calories: {
        type: Sequelize.INTEGER,
      },
      serving_size_g: {
        type: Sequelize.INTEGER,
      },
      fat_total_g: {
        type: Sequelize.INTEGER,
      },
      fat_saturated_g: {
        type: Sequelize.INTEGER,
      },
      protein_g: {
        type: Sequelize.INTEGER,
      },
      sodium_mg: {
        type: Sequelize.INTEGER,
      },
      potassium_mg: {
        type: Sequelize.INTEGER,
      },
      cholesterol_mg: {
        type: Sequelize.INTEGER,
      },
      carbohydrates_total_g: {
        type: Sequelize.INTEGER,
      },
      fiber_g: {
        type: Sequelize.INTEGER,
      },
      sugar_g: {
        type: Sequelize.INTEGER,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Fruits");
  },
};
