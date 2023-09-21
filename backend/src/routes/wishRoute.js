const express = require("express");
const { isAuthenticate } = require("../middlewares/auth");
const {
  createWishList,
  updateWishListById,
  getWishListById,
} = require("../controllers/wishController");

const router = express.Router();

router
  .route("/")
  .post(isAuthenticate, createWishList)
  .put(isAuthenticate, updateWishListById)
  .get(isAuthenticate, getWishListById);

module.exports = router;
