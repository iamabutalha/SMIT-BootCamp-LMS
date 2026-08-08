/**
 * Wraps an async route handler so rejected promises are forwarded to the
 * centralized error handler instead of crashing the process.
 *
 * @param {import('express').RequestHandler} fn
 * @returns {import('express').RequestHandler}
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
