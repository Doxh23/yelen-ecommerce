const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");
const router = express.Router();

const {
  isauthenticatedUser,
  authorizedRoles,
} = require("../middleware/auth.middleware");

router.route("/order/new").post(isauthenticatedUser, newOrder);

router.route("/order/:id").get(isauthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isauthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isauthenticatedUser, authorizedRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isauthenticatedUser, authorizedRoles("admin"), updateOrder)
  .delete(isauthenticatedUser, authorizedRoles("admin"), deleteOrder);

module.exports = router;
