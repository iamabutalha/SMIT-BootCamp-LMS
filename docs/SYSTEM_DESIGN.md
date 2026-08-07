# Bootcamp LMS - System Design

## 1. High-Level Architecture
The LMS follows a standard Client-Server architecture utilizing the MERN stack.

*   **Frontend (Client):** React.js (bootstrapped with Vite), styled with Tailwind CSS. Handles UI, client-side routing, and state management.
*   **Backend (API):** Node.js with Express.js. Serves as a RESTful API fulfilling frontend requests, enforcing business logic, and handling authentication.
*   **Database:** MongoDB. A NoSQL document database storing users, cohorts, tasks, and attendance records.

## 2. Request Lifecycle
When a client makes a request to the backend, it follows this strict lifecycle:

1.  **Client Request:** Frontend sends an HTTP request (e.g., `POST /api/tasks`) with a JWT in the `Authorization` header.
2.  **Authentication Middleware:** Verifies the JWT signature. If invalid/missing, returns `401 Unauthorized`.
3.  **RBAC Middleware (Role-Based Access Control):** Checks if the authenticated user's role (Admin, Mentor, Student) is authorized for the route. If not, returns `403 Forbidden`.
4.  **Validation Layer:** (e.g., Zod or Joi) Validates the incoming request body/params. Returns `400 Bad Request` if schema validation fails.
5.  **Controller:** Handles the parsed request, invokes necessary database operations via Mongoose models.
6.  **Database (MongoDB):** Executes the query and returns the result to the controller.
7.  **Response:** Controller formats the data and sends a JSON response back to the client.

## 3. Data Flow (Example: Marking Attendance)
1.  **Mentor** selects a cohort and date on the React UI.
2.  UI fetches the student list for that cohort (`GET /api/cohorts/:id/students`).
3.  **Mentor** toggles attendance statuses and clicks "Save".
4.  UI sends a bulk update payload to `POST /api/attendance`.
5.  **Express Backend** verifies the Mentor's JWT and checks if they are assigned to that cohort.
6.  **Backend** writes the attendance records to the MongoDB `Attendance` collection.
7.  **Backend** returns a `200 OK` success message.
8.  **Frontend** shows a success toast notification.

## 4. Deployment Strategy (Proposed)
*   **Frontend:** Vercel or Netlify (seamless integration with Vite/React).
*   **Backend:** Render, Railway, or AWS EC2 (Node.js runtime).
*   **Database:** MongoDB Atlas (fully managed cloud database).
*   **File Storage (Phase 2):** AWS S3 or Cloudinary for profile pictures and task attachments.
