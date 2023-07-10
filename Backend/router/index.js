const express = require("express");
const router = express.Router();

const UserController = require("../controller/UserController");

const fruitRouter = require("./fruit");
const transactionRouter = require("./transaction");
const orderRouter = require("./order");
const TransactionController = require("../controller/TransactionController");
const authenticate = require("../middleware/authenticate");

router.post("/register", UserController.registerController);

router.post("/login", UserController.loginController);

router.post("/googleLogin", UserController.googleLoginController);

router.post("/githubLogin", UserController.githubLoginController);

router.post(
  "/midtransToken",
  authenticate,
  TransactionController.midtransToken
);

router.use("/fruit", fruitRouter);

router.use("/order", orderRouter);

router.use("/transaction", transactionRouter);

module.exports = router;
