const express = require("express");
const router = express.Router();

const {
  createUser,
  login,
  logout,
  forgotPassword,
  newPassword,
  changePassword,
} = require("../controller/UserController");
const {
    isauthenticatedUser,
    authorizedRoles,
  } = require("../middleware/auth.middleware");
//user routing
router.route("/user/register").post(createUser);
router.route("/user/login").post(login);
router.route("/user/logout").post(logout);
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(newPassword);
router.route("/password/changepassword").put(isauthenticatedUser,changePassword);


module.exports = router;
