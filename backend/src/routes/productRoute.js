const express = require("express");
const { isAuthenticate, authorizeRoles } = require("../middlewares/auth");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/productController");
const router = express.Router();

router.route("/all").get(getAllProduct);
router
  .route("/new")
  .post(isAuthenticate, authorizeRoles("admin"), createProduct);
router
  .route("/:id")
  .put(authorizeRoles("admin"), updateProduct)
  .delete(authorizeRoles("admin"), deleteProduct)
  .get(getSingleProduct);

module.exports = router;
