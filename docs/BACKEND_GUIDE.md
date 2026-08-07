# Bootcamp LMS - Backend Guide

## 1. Folder Structure
We follow a standard MVC-inspired architecture for our Node.js/Express backend to keep things modular and easy to scale.

```text
/backend
├── /config         # Database connections and environment variables
├── /controllers    # Core business logic for endpoints
├── /middlewares    # JWT verification, RBAC, and error handlers
├── /models         # Mongoose schemas (User, Task, Cohort, etc.)
├── /routes         # Express router definitions
├── /utils          # Helper functions (hashing, validators, formatting)
└── server.js       # Main application entry point
```

## 2. How to Add a New Feature
When building a new API feature, follow this strict pipeline to ensure consistency:

1.  **Define the Data (Model):** Start in `/models`. Create or update the Mongoose schema. Ensure you include necessary fields, enums, and timestamps.
2.  **Write the Logic (Controller):** Head to `/controllers`. Write functions to handle requests, interact with the DB, and format the JSON response. 
3.  **Create the Endpoint (Route):** In `/routes`, map the HTTP method to your new controller.
4.  **Secure It (Middleware):** Protect the route. Apply `verifyToken` for authentication and `authorizeRoles(['ADMIN', 'MENTOR'])` for RBAC.
5.  **Testing & Review:** Ensure the new endpoint perfectly matches the `API_CONTRACT.md`. Sumeet or Karl should ideally review the PR to guarantee the data shape meets the frontend's needs before merging.

## 3. Error Handling
Never expose raw database errors to the client. Use a global error-handling middleware. Controllers should use `try/catch` blocks and pass errors to the `next()` function, which will format them into our standard `{ success: false, message: ... }` response.
