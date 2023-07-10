const { User, Fruit, Transaction, Order } = require("../models");

class OrderController {
  static async createOrder(req, res, next) {
    try {
      const userId = +req.userData.userId;
      const fruitId = +req.params.id;

      const fruitData = await Fruit.findByPk(fruitId);

      if (!fruitData) throw { name: "FruitNotFound" };

      const response = await Order.create({
        UserId: userId,
        FruitId: fruitId,
        quantity_gram: 100,
      });

      // console.log(response, "di order");

      res.status(201).json({ message: "Order Created", response });
    } catch (err) {
      console.error(err.response);
      next(err);
    }
  }

  static async getUserOrder(req, res, next) {
    try {
      const userId = +req.userData.userId;

      const orderData = await Order.findAll({
        where: { UserId: userId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        order: [["id", "DESC"]],
        include: [
          { model: Fruit, attributes: { exclude: ["createdAt", "updatedAt"] } },
        ],
      });

      if (!orderData) throw { name: "ErrorNotFound" };

      res.status(201).json(orderData);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
module.exports = OrderController;
