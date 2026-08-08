import ApiError from '../utils/api-error.js';

/**
 * Centralized error-handling middleware. Converts known error types into the
 * standard `{ success: false, message, errors }` envelope and never leaks
 * raw database errors to the client.
 *
 * Must be registered LAST, after all routes.
 */
// eslint-disable-next-line no-unused-vars -- Express requires the 4-arg signature.
const errorHandler = (err, req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let errors = err.errors || [];

  // Mongoose validation error -> 400 with field details.
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // Duplicate key (e.g. email already exists) -> 409.
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `${field} already exists`;
    errors = [{ field, message }];
  }

  // Invalid ObjectId in a route param -> 400.
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}`;
  }

  // Invalid/expired JWT -> 401.
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Invalid or expired token';
  }

  // Log unexpected (non-operational) errors for debugging; hide details in prod.
  if (statusCode >= 500) {
    console.error('[error]', err);
    if (process.env.NODE_ENV === 'production') {
      message = 'Internal server error';
    }
  }

  const body = { success: false, message };
  if (errors.length > 0) body.errors = errors;

  return res.status(statusCode).json(body);
};

export default errorHandler;
export { ApiError };
