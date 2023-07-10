const { User, Fruit, Transaction, Order } = require("../models");

const { signToken, verifyToken } = require("../helper/jwt");

const authenticate = async (req, res, next) => {
  try {
    let { access_token } = req.headers;

    if (!access_token) {
      throw { name: "InvalidToken" };
    }

    const verify = verifyToken(access_token);

    if (!verify) throw { name: "InvalidToken" };

    const userId = verify.id;

    const userData = await User.findByPk(userId);

    if (!userData) throw { name: "User Not Found" };

    req.userData = { userId: userData.id, userEmail: userData.email };

    next();
  } catch (err) {
    next(err);
  }
};
module.exports = authenticate;
