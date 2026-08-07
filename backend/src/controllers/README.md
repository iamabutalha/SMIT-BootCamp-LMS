# src/controllers/

Request handlers that act as the bridge between routes and services.

A controller receives the Express request, validates/normalizes input when needed, delegates business logic to the appropriate service, and sends the HTTP response. Controllers should NOT contain business logic or database queries directly; they orchestrate service calls and handle success/error flows.

## Contents at time of initialization

- `README.md` - This file.

## Planned controllers

- `auth.controller.js` - Registration, login, logout, refresh-token, and password reset flows.
- `user.controller.js` - Get/update profile, list users, delete user account.
- `course.controller.js` - Create, read, update, delete, and enroll operations for courses.
- `assignment.controller.js` - Assignment CRUD and submission handling.

## Conventions

- Each controller method is async and wrapped with `asyncHandler` to forward rejections to the error middleware.
- Responses are built with the shared `apiResponse` utility for consistent shape.
- Errors are thrown as `apiError` instances so the error middleware can format them uniformly.