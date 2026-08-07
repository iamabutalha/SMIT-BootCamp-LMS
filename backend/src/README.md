# src/

The root application source directory for the backend service.

This folder contains all server-side application code, organized into feature and layer-based subfolders. It is written in modern CommonJS-free Express.js using ES modules (`"type": "module"` in package.json) and follows a layered architecture (routes → controllers → services → models ← config).

## Contents at time of initialization

- **[routes/](./routes)** - Express routers mapping HTTP endpoints to controller actions.
- **[controllers/](./controllers)** - Request handlers that orchestrate service calls and build responses.
- **[services/](./services)** - Business logic and reusable operations (data access, hashing, third-party calls).
- **[middlewares/](./middlewares)** - Route and app-level middleware (auth, error handling, uploads, validation).
- **[models/](./models)** - Mongoose schemas and models representing MongoDB collections.
- **[config/](./config)** - Environment-driven configuration loaders (DB, JWT, Cloudinary, email, etc.).
- **[utils/](./utils)** - Shared utilities (APIError, apiResponse, token helpers, validators).
- **[docs/](./docs)** - Static API documentation, OpenAPI/Swagger assets, and guides.

## Application entry points

The entry points that wire everything together live here:

- `app.js` - Creates and configures the Express application (middleware stack, routes, error handlers).
- `server.js` - Starts the HTTP server and connects to the database.

These are generated when the application is scaffolded.