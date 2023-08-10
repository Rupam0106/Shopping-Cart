const { createPayment } = require("../controllers/paymentController");
const express = require("express");
const { isAuthenticate } = require("../middlewares/auth");
const router = express.Router();

router.route("/").post(isAuthenticate, createPayment);

module.exports = router;
