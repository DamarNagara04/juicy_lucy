"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fruit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Fruit.hasMany(models.Order, { foreignKey: "FruitId" });
    }
  }
  Fruit.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "name cannot be empty",
          },
          notEmpty: {
            msg: "name cannot be empty",
          },
        },
      },
      calories: DataTypes.INTEGER,
      serving_size_g: DataTypes.INTEGER,
      fat_total_g: DataTypes.INTEGER,
      fat_saturated_g: DataTypes.INTEGER,
      protein_g: DataTypes.INTEGER,
      sodium_mg: DataTypes.INTEGER,
      potassium_mg: DataTypes.INTEGER,
      cholesterol_mg: DataTypes.INTEGER,
      carbohydrates_total_g: DataTypes.INTEGER,
      fiber_g: DataTypes.INTEGER,
      sugar_g: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Fruit",
    }
  );
  return Fruit;
};
