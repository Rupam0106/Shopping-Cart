const express = require("express");
const { isAuthenticate } = require("../middlewares/auth");
const {
  createWishList,
  updateWishListById,
  getWishListById,
} = require("../controllers/wishController");

const router = express.Router();

router.route("/create").post(isAuthenticate, createWishList);
router.route("/update").put(isAuthenticate, updateWishListById);
router.route("/get").get(isAuthenticate, getWishListById);

module.exports = router;
