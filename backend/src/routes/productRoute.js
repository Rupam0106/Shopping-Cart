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
router.route("/product/search/:searchTerm").get(searchProduct);

router
  .route("/product/new")
  .post(isAuthenticate,authorizeRoles("admin"), createProduct); 
router
  .route("/product/:id")
  .put(isAuthenticate,authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticate, authorizeRoles("admin"), deleteProduct)
  .get(getSingleProduct);

module.exports = router;
