const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  createProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const {
  isauthenticatedUser,
  authorizedRoles,
} = require("../middleware/auth.middleware");

//product routing
router.route("/products").get(isauthenticatedUser, getAllProduct);
router
  .route("/product/:id")
  .get(isauthenticatedUser,getOneProduct)
  .put(isauthenticatedUser,updateProduct)
  .delete(isauthenticatedUser,deleteProduct);
router.route("/product/new").post(isauthenticatedUser,authorizedRoles('admin'),createProduct);

module.exports = router;
