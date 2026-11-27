import handleError from "../helper/handleError.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error in the server';

if (err.code === 11000) {

  const field =
    Object.keys(err.keyValue)[0];

  const value =
    err.keyValue[field];

  const message =
    `${field}: ${value} already exists`;

  err = new handleError(
    message,
    400
  );
}

  res.status(err.statusCode).json({
    status: err.status,
    success: false,
    error: err,
    message: err.message,
    stack: err.stack
  });
};