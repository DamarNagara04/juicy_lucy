const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const TransactionController = require("../controller/TransactionController");

router.post("/", authenticate, TransactionController.createTransaction);

router.get("/", authenticate, TransactionController.getAllTransaction);

router.patch("/", authenticate, TransactionController.updateStatusPaid);

module.exports = router;
