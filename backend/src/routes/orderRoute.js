const express = require("express");
const { isAuthenticate } = require("../middlewares/auth");
const {
  createOrder,
  updatedOrder,
  cancelOrder,
  getOrder,
  getSpecificOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.route("/").post(isAuthenticate, createOrder);
router.route("/").get(isAuthenticate, getOrder);
router.route("/get/:orderId").get(isAuthenticate, getSpecificOrder);
router.route("/:orderId").put(isAuthenticate, updatedOrder);
router.route("/cancel/:orderId").put(isAuthenticate, cancelOrder);

module.exports = router;
