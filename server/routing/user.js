const express = require("express");
const router = express.Router();

const { createUser,login, logout, forgotPassword } = require("../controller/UserController");

//user routing 
router.route("/user/register").post(createUser);
router.route("/user/login").post(login); 
router.route('/user/logout').post(logout)
router.route('/user/forgotpassword').post(forgotPassword)

module.exports = router;
