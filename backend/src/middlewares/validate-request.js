import { validationResult } from 'express-validator';
import ApiError from '../utils/api-error.js';

/**
 * Runs after an express-validator chain. If any rule failed, throws a 400
 * ApiError carrying `errors: [{ field, message }]` per the API contract.
 */
const validateRequest = (req, _res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const errors = result.array().map((e) => ({
    field: e.path,
    message: e.msg,
  }));

  return next(ApiError.badRequest('Validation failed', errors));
};

export default validateRequest;
