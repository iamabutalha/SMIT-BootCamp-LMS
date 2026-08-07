# src/config/

Centralized configuration modules that read from environment variables and initialize external services.

Keeping configuration here separates secrets and environment-specific values from application logic. Every config module should be loaded once (typically at startup) and imported wherever needed. Never hardcode secrets directly in application code.

## Contents at time of initialization

- `README.md` - This file.

## Planned config modules

- `database.js` - Connects to MongoDB via Mongoose using `MONGODB_URI`.
- `cloudinary.js` - Initializes the Cloudinary SDK with `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
- `email.js` - Configures Nodemailer transport using SMTP env vars (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`).
- `jwt.js` - Exposes the JWT secret and expiration (`JWT_SECRET`, `JWT_EXPIRES_IN`).
- `rateLimit.js` - Configures rate-limiting options for `express-rate-limit`.

## Conventions

- All config files export a single configured instance or a `connect()` / `init()` function.
- Values are sourced from `process.env` with safe defaults where appropriate.
- Sensitive values are never logged.