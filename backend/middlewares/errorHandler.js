// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Handle different error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  // Default to 500 server error
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
};

module.exports = errorHandler;  // ← Must export the function directly