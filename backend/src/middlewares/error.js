const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //validation Error
  if (err.name == "ValidationError") {
    err = new ErrorHandler(err.message, 400);
  }
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `TokenExpired`;
    err = new ErrorHandler(message, 500);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `TokenExpired`;
    err = new ErrorHandler(message, 500);
  }
  if (err.code === 500) {
    const message = `Please Try Again`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
