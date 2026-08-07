# src/routes/

Express routers that map HTTP endpoints (URL + method) to controller actions.

Routes are thin: they define the path, attach middleware (auth, validation, uploads), bind to a controller method, and export the mounted router. They must not contain business logic.

## Contents at time of initialization

- `README.md` - This file.

## Planned routes

- `auth.routes.js` - `/api/v1/auth/*` (register, login, logout, refresh, reset password).
- `user.routes.js` - `/api/v1/users/*` (profile CRUD, admin user management).
- `course.routes.js` - `/api/v1/courses/*` (CRUD, enrollment, lessons, assignments).
- `index.js` - Mounts all routers onto the main Express app with the API version prefix.

## Conventions

- Use the application-level `router` from `express`.
- Protect routes with the shared `auth.middleware.js` and `authorize.js` middlewares.
- Validate inputs with `express-validator` chains + `validateRequest` middleware.
- Keep a consistent API versioning prefix (e.g., `/api/v1/`).