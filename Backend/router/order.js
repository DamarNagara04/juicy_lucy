const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
// const authorize = require("../middleware/authorize");

const OrderController = require("../controller/OrderController");

router.get("/", authenticate, OrderController.getUserOrder);

router.post("/:id", authenticate, OrderController.createOrder);

module.exports = router;
