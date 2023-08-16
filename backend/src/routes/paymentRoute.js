const { createPayment, paymentStatus } = require("../controllers/paymentController");
const express = require("express");
const { isAuthenticate } = require("../middlewares/auth");
const router = express.Router();

router.route("/").post(isAuthenticate, createPayment);
router.route("/status").post(isAuthenticate, paymentStatus);

module.exports = router;

