const { User, Fruit, Transaction, Order } = require("../models");

const authorize = async (req, res, next) => {
  try {
    const { userId } = req.userData;

    //  const groceryId = +req.params.id;

    const transactionData = await Transaction.findOne({
      where: { UserId: userId, isPaid: false },
    });

    if (!transactionData) throw { name: "No Available Transaction" };

    //  console.log(transactionData, "di authZ >>>>>>>>>>>>>>>..");

    if (transactionData.UserId !== userId) {
      throw { name: "Unauthorized" };
    } else {
      next();
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
module.exports = authorize;
