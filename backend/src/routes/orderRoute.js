const express = require("express");
const { isAuthenticate } = require("../middlewares/auth");
const {
  createOrder,
  updateOrder,
  completedOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.route("/create").post(isAuthenticate, createOrder);
router.route("/cancel").put(isAuthenticate, updateOrder);
router.route("/delivered").put(isAuthenticate, completedOrder);

module.exports = router;