# Bootcamp LMS - Coding Standards

## 1. Naming Conventions
*   **Files & Folders:** `kebab-case` (e.g., `user-controller.js`, `task-routes.js`).
*   **React Components:** `PascalCase` (e.g., `TaskCard.jsx`, `SubmitModal.jsx`).
*   **Variables & Functions:** `camelCase` (e.g., `fetchUserData`, `isLoggedIn`).
*   **Database Models:** `PascalCase` and singular (e.g., `User`, `Cohort`).
*   **Database Collections:** `camelCase` and pluralized by Mongoose (e.g., `users`, `cohorts`).

## 2. Standard API Response Shape
Every API response from the backend MUST follow this exact structure to ensure frontend parsers don't break.

**Success (2xx):**
```json
{
  "success": true,
  "data": { ... }, // Or an array []
  "message": "Optional success message"
}
```

**Error (4xx, 5xx):**
```json
{
  "success": false,
  "message": "Human readable error description",
  "errors": [
    { "field": "email", "message": "Email is already in use." }
  ] // Optional, usually for validation failures
}
```

## 3. Formatting & Linting
*   **Prettier:** All code must be formatted using Prettier before committing. Use the default configuration (2 spaces, semi-colons required).
*   **ESLint:** Run ESLint locally to catch standard JS errors. Treat warnings as suggestions and errors as hard blockers for PRs.
*   **Comments:** Use JSDoc style comments for complex functions, explaining `params` and `returns`.
