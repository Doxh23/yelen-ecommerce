require("dotenv").config();
const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

const isauthenticatedUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, async (err, users) => {
      if (err) {
        console.log(err);
        res.redirect("/");
      } else {
        let user = await userModel.findById(users.id);
        req.user = user;
        next();
      }
    });
  } else {
    res.clearCookie("jwt");
    res.redirect("/");
  }
};
const checkConnection = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("test");
  if (token) {
    jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, async (err, users) => {
      if (err) {
        console.log(err);
        res.redirect("/");
      } else {
        let user = await userModel.findById(users.id);
        res.status(200).json({ sucess: true, user: user });
      }
    });
  } else {
    res.clearCookie("jwt");
    return next(new ErrorHandler(`you are not connected `, 403));
  }
};
const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `
            Role: ${req.user.role} is not allowed to acces in this rescource`,
          403
        )
      );
    } else {
      next();
    }
  };
};
module.exports = { isauthenticatedUser, authorizedRoles, checkConnection };
