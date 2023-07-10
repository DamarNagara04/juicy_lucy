// const Midtrans = require("midtrans-client");
const midtransClient = require("midtrans-client");

const { User, Fruit, Transaction, Order } = require("../models");

class TransactionController {
  static async createTransaction(req, res, next) {
    try {
      const userId = +req.userData.userId;

      const { OrderId, amount, quantity } = req.body;

      if (!OrderId) throw { name: "OrderIdRequired" };
      if (!amount) throw { name: "AmountRequired" };

      // console.log(quantity, ">>>>>>>>>>>>>>>>>>>>>>>>>>");

      // if (quantity < 100) throw { name: "QuantityMinimum" };

      const orderData = await Order.findByPk(OrderId);

      if (!orderData) throw { name: "ErrorNotFound" };

      // console.log(userId, OrderId, amount, "di transaction");

      const response = await Transaction.create({
        UserId: userId,
        OrderId: OrderId,
        amount: amount,
        isPaid: false,
      });

      res.status(201).json({ message: "Transaction Created", response });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async getAllTransaction(req, res, next) {
    try {
      const userId = +req.userData.userId;

      const response = await Transaction.findAll({
        where: { UserId: userId },
      });

      if (!response) throw { name: "ErrorNotFound" };

      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async updateStatusPaid(req, res, next) {
    try {
      const userId = +req.userData.userId;

      const transactionId = +req.body.transactionId;

      if (!transactionId) throw { name: "TransactionIdRequired" };

      const transData = await Transaction.findByPk(transactionId);

      if (!transData) throw { name: "ErrorNotFound" };

      // console.log(userId, transactionId, "di update");

      const data = await Transaction.update(
        {
          isPaid: true,
        },
        { where: { id: transactionId, UserId: userId }, returning: true }
      );

      if (data[0] === 0) {
        throw {
          name: "TransactionNotFound",
        };
      }

      res.status(200).json({ message: "Transaction Has Been Paid" });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async midtransToken(req, res, next) {
    try {
      // console.log(req.userData, "req data>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      const findUser = await User.findByPk(req.userData.userId);

      // console.log(findUser, "di server >>>>>>>>>>>");

      const { amount } = req.body;

      if (!amount) throw { name: "AmountRequired" };

      // console.log(amount, "di midtaraasdfnnns");

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: "TRANSACTION" + Math.floor(100000 + Math.random() * 250000),
          gross_amount: amount, //total harga, bisa dari req.body
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          username: findUser.username,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);

      res.status(201).json(midtransToken);
    } catch (err) {
      console.log(err, "INI ERROR PAYMENT");
      next(err);
    }
  }
}
module.exports = TransactionController;
