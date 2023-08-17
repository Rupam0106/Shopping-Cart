const {
  createPayment,
  paymentStatus,
  trackOrder,
} = require("../controllers/paymentController");
const express = require("express");
const { isAuthenticate } = require("../middlewares/auth");
const router = express.Router();

router.route("/").post(isAuthenticate, createPayment);
router.route("/status").post(isAuthenticate, paymentStatus);
router.route("/track/:id").get( trackOrder);

module.exports = router;
