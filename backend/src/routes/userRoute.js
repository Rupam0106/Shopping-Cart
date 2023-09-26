const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updatePassword,
  deleteUser,
  getUserDetails,
  refreshToken,
  guestUser,
} = require("../controllers/userController");
const { isAuthenticate } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/guest").post(guestUser);
router
  .route("/password")
  .post(forgotPassword)
  .put(isAuthenticate, updatePassword);
router.route("/refresh-token").post(refreshToken);
router.route("/password/:token").put(resetPassword);
router
  .route("/me")
  .get(isAuthenticate, getUserDetails)
  .delete(isAuthenticate, deleteUser);
router.route("/logout").get(isAuthenticate, logoutUser);

module.exports = router;
