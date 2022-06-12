require("dotenv").config();
const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");

const isauthenticatedUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, async (err, users) => {
      if (err) {
        console.log(err);
        next(new errorHandler(`Role:you are not connected`, 403));
      } else {
        let user = await userModel.findById(users.id);
        req.user = user;
        res.status(200).json({success:true})
      }
    });
  } else {
    res.clearCookie("jwt");
    next(new errorHandler(`you are not connected`, 403));
  }
};
const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new errorHandler(
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
module.exports = { isauthenticatedUser, authorizedRoles };
