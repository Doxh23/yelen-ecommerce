const express = require("express");
const router = express.Router();

const { createUser,login, logout } = require("../controller/UserController");

//user routing
router.route("/user/register").post(createUser);
router.route("/user/signIn").post(login);
router.route('user/logout').post(logout)

module.exports = router;
