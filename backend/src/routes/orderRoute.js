const express = require("express");
const { isAuthenticate } = require("../middlewares/auth");
const {
  createOrder,
  updatedOrder,
  cancelOrder,
  getOrder,
  getSpecificOrder,
  getOrderOfCurrentUser,
} = require("../controllers/orderController");
const { sendOrderDetailsByMail } = require("../controllers/paymentController");

const router = express.Router();

router.route("/").post(isAuthenticate, createOrder);
router.route("/").get(isAuthenticate, getOrder);
router.route("/get/:orderId").get(isAuthenticate, getSpecificOrder);
router.route("/:orderId").put(isAuthenticate, updatedOrder);
router.route("/cancel/:orderId").put(isAuthenticate, cancelOrder);
router.route("/summary").get(isAuthenticate, getOrderOfCurrentUser);
router.route("/mail").post(isAuthenticate, sendOrderDetailsByMail);

module.exports = router;
