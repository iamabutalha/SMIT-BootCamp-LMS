# src/utils/

Shared, dependency-free helpers used across the application.

Utilities should be pure functions with no Express request/response coupling so they can be reused and tested independently.

## Contents at time of initialization

- `README.md` - This file.

## Planned utilities

- `apiError.js` - Custom `ApiError` class (extends `Error`) carrying an HTTP status code.
- `apiResponse.js` - Standardized success/error response envelope.
- `generateToken.js` - Creates signed JWT access/refresh tokens.
- `asyncHandler.js` - (If not placed in middlewares) Promise wrapper for route handlers.
- `logger.js` - Lightweight logger abstraction (wraps `morgan`/`console` consistently).
- `validators.js` - Reusable validation schema helpers / regex constants.
- `fileHelper.js` - File-name sanitization and MIME-type helpers for uploads.

## Conventions

- Keep helpers pure and synchronous where possible.
- Avoid side effects and global state.
- Export named functions for granular imports.