const express = require("express");
const router = express.Router();

const {
  createUser,
  login,
  logout,
  forgotPassword,
  newPassword,
  changePassword,
  userGetDetails,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controller/UserController");
const {
  isauthenticatedUser,
  authorizedRoles,
} = require("../middleware/auth.middleware");
//user routing
router.route("/user/register").post(createUser);
router.route("/user/login").post(login);
router.route("/user/logout").post(logout);
router.route("/user/getDetails").get(userGetDetails);
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(newPassword);
router.route("/me/updatepassword").put(changePassword);

router.route("/me").get(userGetDetails);
router.route("/admin/users").get(authorizedRoles("admin"), getAllUser);
router
  .route("/admin/:id")
  .get(authorizedRoles("admin"), getSingleUser)
  .put(authorizedRoles("admin"), updateUserRole)
  .delete(authorizedRoles("admin"), deleteUser);
router.route("/user/checkUser").get(isauthenticatedUser)
module.exports = router;
