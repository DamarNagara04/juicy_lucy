const { User, Fruit, Transaction, Order } = require("../models");
const axios = require("axios");

let query =
  "apple orange kiwi avocado strawberry Pineapple mango lemon cranberry watermelon Lychee grapes Pomegranate Peaches Blackberries Pears";

class FruitController {
  static async getAllFruit(req, res, next) {
    try {
      const { Op } = require("sequelize");

      let { page, search, limit } = req.query;

      if (!page) {
        page = 1;
      }
      if (!search) {
        search = "";
      }
      if (!limit) {
        limit = 9;
      }

      // const fruitData = await Fruit.findAll({
      //   attributes: { exclude: ["createdAt", "updatedAt"] },
      // });

      const fruitData = await Fruit.findAndCountAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "ASC"]],
        limit: limit,
        offset: (page - 1) * limit,
        where: { name: { [Op.iLike]: `%${search}%` } },
      });

      if (!fruitData) throw { name: "FruitNotFound" };

      const pageTotal = Math.ceil(fruitData.count / limit);

      if (!pageTotal) {
        throw { name: "ErrorNotFound" };
      }

      res.status(200).json({ fruitData, pageTotal });
    } catch (err) {
      console.error(err);
    }
  }
}
module.exports = FruitController;

// static async createFruit(req, res, next) {
//    try {
//      const { fruitName } = req.body;

//      const options = {
//        method: "GET",
//        url: "https://api.api-ninjas.com/v1/nutrition?query=" + fruitName,
//        headers: { "X-Api-Key": "HS3mQQzAs4xFaYY8zszb1g==IOtMAI66hVJSeXQO" },
//      };

//      const response = await axios.request(options);

//      const fruitData = response.data[0];

//      console.log(typeof fruitData.calories);

//      console.log(fruitData);

//      // const createData = await Fruit.create(fruitData);

//      const createData = await Fruit.create({
//        name: fruitData.name,
//        calories: +fruitData.calories,
//        serving_size_g: +fruitData.serving_size_g,
//        fat_total_g: +fruitData.fat_total_g,
//        fat_saturated_g: +fruitData.fat_saturated_g,
//        protein_g: +fruitData.protein_g,
//        sodium_mg: +fruitData.sodium_mg,
//        potassium_mg: +fruitData.potassium_mg,
//        cholesterol_mg: +fruitData.cholesterol_mg,
//        carbohydrates_total_g: +fruitData.carbohydrates_total_g,
//        fiber_g: +fruitData.fiber_g,
//        sugar_g: +fruitData.sugar_g,
//      });

//      res.status(201).json({ message: "New Fruit Added", createData });
//    } catch (err) {
//      console.error(err);
//    }
//  }
