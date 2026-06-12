const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Email already exists.",
    });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
    stack:
      process.env.NODE_ENV === "production"
        ? undefined
        : err.stack,
  });
};

export { notFound, errorHandler };