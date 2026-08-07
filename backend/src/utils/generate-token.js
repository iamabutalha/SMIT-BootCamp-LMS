import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.js';

/**
 * Signs a JWT for an authenticated user.
 * The payload is intentionally minimal — the middleware re-fetches the user.
 *
 * @param {{ id: string, role: string }} payload
 * @returns {string} signed JWT
 */
export const generateToken = ({ id, role }) => {
  return jwt.sign({ id, role }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

/**
 * Verifies and decodes a JWT. Throws if invalid/expired.
 * @param {string} token
 * @returns {{ id: string, role: string, iat: number, exp: number }}
 */
export const verifyJwt = (token) => {
  return jwt.verify(token, jwtConfig.secret);
};
