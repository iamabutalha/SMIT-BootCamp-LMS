# Bootcamp LMS - API Contract

## Global Standards
*   **Base URL:** `/api/v1`
*   **Authentication:** Bearer token (JWT) passed in the `Authorization` header.
*   **Content-Type:** `application/json` (unless handling file uploads).
*   **Standard Error Response:**
    ```json
    {
      "success": false,
      "message": "Error description here",
      "errors": [{ "field": "email", "message": "Invalid email format" }] 
    }
    ```

---

## 1. Authentication & Users

### `POST /auth/register`
*   **Description:** Self-registration for students. Role defaults to `STUDENT`.
*   **Auth Required:** None (Public)
*   **Request Body:**
    ```json
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "password": "securepassword123"
    }
    ```
*   **Response (201 Created):**
    ```json
    {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIs...",
      "user": { "id": "64a1b", "name": "Jane Doe", "role": "STUDENT" }
    }
    ```

### `POST /auth/login`
*   **Description:** Authenticates a user and returns a JWT.
*   **Auth Required:** None (Public)
*   **Request Body:**
    ```json
    {
      "email": "jane@example.com",
      "password": "securepassword123"
    }
    ```
*   **Response (200 OK):** *(Same as Register Response)*

### `PATCH /users/:id/role`
*   **Description:** Elevates or changes a user's role.
*   **Auth Required:** `ADMIN`
*   **Request Body:**
    ```json
    {
      "role": "MENTOR" // Enum: ADMIN, MENTOR, STUDENT
    }
    ```
*   **Response (200 OK):**
    ```json
    { "success": true, "message": "User role updated successfully." }
    ```

---

## 2. Cohorts

### `POST /cohorts`
*   **Description:** Creates a new learning cohort.
*   **Auth Required:** `ADMIN`
*   **Request Body:**
    ```json
    {
      "name": "Full Stack Web Dev - Fall 2026",
      "startDate": "2026-09-01T00:00:00Z",
      "endDate": "2026-12-15T00:00:00Z"
    }
    ```
*   **Response (201 Created):**
    ```json
    {
      "success": true,
      "cohort": { "id": "78c2d", "name": "...", "isActive": true }
    }
    ```

### `POST /cohorts/:id/assign-mentor`
*   **Description:** Assigns a mentor to a specific cohort.
*   **Auth Required:** `ADMIN`
*   **Request Body:**
    ```json
    { "mentorId": "64a1b" }
    ```
*   **Response (200 OK):**
    ```json
    { "success": true, "message": "Mentor assigned to cohort." }
    ```

---

## 3. Tasks & Submissions

### `POST /tasks`
*   **Description:** Creates a new task/assignment for a cohort.
*   **Auth Required:** `MENTOR`, `ADMIN`
*   **Request Body:**
    ```json
    {
      "title": "Build a REST API",
      "description": "Use Express and MongoDB to create...",
      "cohortId": "78c2d",
      "dueDate": "2026-09-10T23:59:59Z"
    }
    ```
*   **Response (201 Created):**
    ```json
    { "success": true, "task": { "id": "99x1z", "title": "Build a REST API" } }
    ```

### `POST /tasks/:taskId/submissions`
*   **Description:** Student submits their work for a task.
*   **Auth Required:** `STUDENT`
*   **Request Body:**
    ```json
    {
      "submissionUrl": "https://github.com/janedoe/rest-api"
    }
    ```
*   **Response (201 Created):**
    ```json
    { "success": true, "submission": { "id": "44p9q", "status": "PENDING" } }
    ```

### `PATCH /submissions/:id/review`
*   **Description:** Mentor grades or reviews a student's submission.
*   **Auth Required:** `MENTOR`, `ADMIN`
*   **Request Body:**
    ```json
    {
      "status": "REVIEWED",
      "grade": 95,
      "feedback": "Great job on the routing logic!"
    }
    ```
*   **Response (200 OK):**
    ```json
    { "success": true, "message": "Submission reviewed." }
    ```

---

## 4. Attendance

### `POST /attendance/bulk`
*   **Description:** Mentor marks attendance for multiple students in a cohort for a specific date.
*   **Auth Required:** `MENTOR`, `ADMIN`
*   **Request Body:**
    ```json
    {
      "cohortId": "78c2d",
      "date": "2026-09-05",
      "records": [
        { "studentId": "12a3b", "status": "PRESENT" },
        { "studentId": "34c5d", "status": "ABSENT" }
      ]
    }
    ```
*   **Response (201 Created):**
    ```json
    { "success": true, "message": "Attendance records saved." }
    ```

### `GET /attendance/student/me`
*   **Description:** Student views their own attendance history.
*   **Auth Required:** `STUDENT`
*   **Response (200 OK):**
    ```json
    {
      "success": true,
      "summary": { "present": 10, "absent": 2, "percentage": 83.3 },
      "history": [
        { "date": "2026-09-05", "status": "PRESENT" }
      ]
    }
    ```
