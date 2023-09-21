const express = require("express");
const { isAuthenticate } = require("../middlewares/auth");
const {
  updateCartById,
  getCartById,
  createCart,
  addToCartFromLocalStorage,
} = require("../controllers/cartController");

const router = express.Router();

router
  .route("/")
  .post(isAuthenticate, createCart)
  .put(isAuthenticate, updateCartById)
  .get(isAuthenticate, getCartById);
router.route("/local-store").put(addToCartFromLocalStorage);

module.exports = router;
