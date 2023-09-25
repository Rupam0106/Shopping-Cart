const express = require("express");
const { isAuthenticate, authorizeRoles } = require("../middlewares/auth");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  searchProduct,
} = require("../controllers/productController");
const router = express.Router();

router.route("/products").get(getAllProduct);
router.route("/products/:searchTerm").get(searchProduct);

router
  .route("/product/new")
  .post(isAuthenticate, createProduct); // Todo : add admin middleware here
router
  .route("/product/:id")
  .put(isAuthenticate,authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticate, authorizeRoles("admin"), deleteProduct)
  .get(getSingleProduct);

module.exports = router;
