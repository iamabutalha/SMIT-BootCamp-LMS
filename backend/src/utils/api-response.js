/**
 * Sends a standardized success envelope: `{ success: true, message, data }`.
 * Use this in every controller so the frontend never has to guess the shape.
 *
 * @param {import('express').Response} res
 * @param {object} [options]
 * @param {number} [options.statusCode=200] - HTTP status code.
 * @param {string} [options.message='Success'] - Human-readable message.
 * @param {*} [options.data=null] - Payload placed under `data`.
 */
export const sendSuccess = (res, { statusCode = 200, message = 'Success', data = null } = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Builds a `data` payload for paginated list endpoints.
 * @param {Array} items
 * @param {{ page: number, limit: number, total: number }} meta
 * @returns {{ items: Array, pagination: object }}
 */
export const buildPaginated = (items, { page, limit, total }) => ({
  items,
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  },
});
