const express = require("express");
const router = express.Router();

const FruitController = require("../controller/FruitController");
// router.post("/fruit", FruitController.createFruit);  // tidak bisa

router.get("/", FruitController.getAllFruit);

module.exports = router;
