const express = require("express");
const { isAuthenticate } = require("../middlewares/auth");
const {
  updateCartById,
  getCartById,
  createCart,
  addToCartFromLocalStorage,
} = require("../controllers/cartController");

const router = express.Router();

router.route("/create").post(isAuthenticate, createCart);
router.route("/update").put(isAuthenticate, updateCartById);
router.route("/all").get(isAuthenticate, getCartById);
router.route("/local-store").put(addToCartFromLocalStorage);


module.exports = router;
