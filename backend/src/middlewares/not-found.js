import ApiError from '../utils/api-error.js';

/**
 * Catches requests to unknown routes and forwards a 404 to the error handler.
 */
const notFound = (req, _res, next) => {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
};

export default notFound;
