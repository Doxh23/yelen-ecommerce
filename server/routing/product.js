const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  createProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getProductAdmin,
} = require("../controller/productController");
const {
  isauthenticatedUser,
  authorizedRoles,
} = require("../middleware/auth.middleware");

//product routing
router.route("/products").get(getAllProduct);
router.route("/product/:id").get(getOneProduct);
router
  .route("/admin/product/:id")
  .put(isauthenticatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isauthenticatedUser, authorizedRoles("admin"), deleteProduct);
router
  .route("/adminproduct/new")
  .post(isauthenticatedUser, authorizedRoles("admin"), createProduct);

router
  .route("/admin/products")
  .get(isauthenticatedUser, authorizedRoles("admin"), getProductAdmin);
module.exports = router;
