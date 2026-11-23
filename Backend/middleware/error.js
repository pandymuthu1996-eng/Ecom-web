export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error in the server';

  res.status(err.statusCode).json({
    status: err.status,
    success: false,
    error: err,
    message: err.message,
    stack: err.stack
  });
};