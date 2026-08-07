/**
 * Operational error carrying an HTTP status code and optional field errors.
 * Throw this from services/controllers; the global error handler formats it
 * into the standard `{ success: false, message, errors }` envelope.
 */
class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code (e.g. 400, 404, 409).
   * @param {string} message - Human-readable message safe to send to clients.
   * @param {Array<{field: string, message: string}>} [errors] - Field-level validation errors.
   */
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad request', errors = []) {
    return new ApiError(400, message, errors);
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message);
  }

  static forbidden(message = 'Forbidden') {
    return new ApiError(403, message);
  }

  static notFound(message = 'Not found') {
    return new ApiError(404, message);
  }

  static conflict(message = 'Conflict') {
    return new ApiError(409, message);
  }
}

export default ApiError;
