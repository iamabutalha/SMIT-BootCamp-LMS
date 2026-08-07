# src/middlewares/

Express middleware for cross-cutting concerns such as security, authentication, uploads, validation, and error handling.

Middlewares here run in the request lifecycle before (or after) controllers and can short-circuit requests by sending an early response (e.g., rejecting an unauthenticated request) or forward to the next middleware/controller via `next()`.

## Contents at time of initialization

- `README.md` - This file.

## Planned middlewares

- `asyncHandler.js` - Wraps async route handlers to auto-catch promise rejections.
- `errorHandler.js` - Centralized error-handling middleware that formats thrown `apiError` instances.
- `notFound.js` - 404 handler for unmatched routes.
- `auth.middleware.js` - Verifies JWT/session and attaches the authenticated user to `req.user`.
- `authorize.js` - Role-based access control (RBAC) middleware (`admin`, `instructor`, `student`).
- `upload.middleware.js` - Multer configuration for file uploads (images, documents).
- `validateRequest.js` - Runs `express-validator` result checks and rejects invalid input.

## Conventions

- Always call `next()` after handling non-error cases unless you are terminating the response.
- Never swallow errors silently; forward them to the centralized error handler.
- Uploads should validate MIME type and size before persisting.