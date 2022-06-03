const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";

  if (err.name === "CastError") {
    let message = `ressource not found, invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if(err.code === 11000){
    console.log(err)
    let message = `duplicate ${Object.keys(err.keyValue)}`
    err = new ErrorHandler(message,400)
  }
  if(err.name === 'jsonWebTokenError'){
    let message = `Json Web Token is invalid,Try again`
    err = new ErrorHandler(message,400)
  }
  if(err.name === 'TokenExpireError'){
    let message = `Json Web Token is expired,Try again`
    err = new ErrorHandler(message,400)
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
