/**
 * Centralized JWT configuration sourced from environment variables.
 * Import this instead of reading `process.env` in multiple places.
 */
const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};

if (!jwtConfig.secret) {
  // Surface the misconfiguration loudly at startup rather than at first login.
  console.warn('[jwt] JWT_SECRET is not set — token signing/verification will fail.');
}

export default jwtConfig;
