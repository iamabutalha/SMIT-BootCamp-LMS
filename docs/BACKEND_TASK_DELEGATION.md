# Bootcamp LMS - Backend Task Delegation & Anti-Conflict Strategy

## 1. Objective

To divide the Phase 1 (MVP) backend API development among Abu Talha, Shah Faisal, and Ali Jan. Work is segmented by feature domains (Models + Controllers + Routes) to ensure zero Git merge conflicts and parallel development.

---

## 2. Work Breakdown Structure

### 🧑‍💻 Ali Jan (full stack) - Core Infrastructure & Authentication

**Focus:** Setting up the foundation, securing the API, and managing user data. Because every other feature relies on Users and Auth, this is the highest priority to merge into `dev` first.

- **Owned Models:** `User`
- **Owned Routes:** `/api/v1/auth/*`, `/api/v1/users/*`
- **Specific Tasks:**
  1.  **Server Setup:** Initialize `server.js`, configure MongoDB connection (`config/db.js`), and set up global error handling middleware.
  2.  **User Schema:** Build the `User.js` model (Name, Email, Password Hash, Role).
  3.  **Auth Controllers:** Implement Registration (`POST /auth/register`) and Login (`POST /auth/login`) with bcrypt and JWT generation.
  4.  **Security Middlewares:** Write `verifyToken.js` and `authorizeRoles.js` (RBAC) so the rest of the team can import them to protect their routes.
  5.  **User Management:** Create the `PATCH /users/:id/role` endpoint for Admins.

### 🧑‍💻 Shah Faisal (Backend) - Cohorts & Task Management

**Focus:** Building the core academic structure. Faisal will handle the creation of batches (cohorts) and the assignments (tasks) given to those batches.

- **Owned Models:** `Cohort`, `Task`
- **Owned Routes:** `/api/v1/cohorts/*`, `/api/v1/tasks/*` (Excluding submissions)
- **Specific Tasks:**
  1.  **Cohort Schema & Logic:** Build `Cohort.js` model. Implement endpoints to create cohorts (`POST /cohorts`), list cohorts (`GET /cohorts`), and assign mentors (`POST /cohorts/:id/assign-mentor`).
  2.  **Task Schema & Logic:** Build `Task.js` model (tied to Cohort and Mentor IDs).
  3.  **Task Endpoints:** Implement endpoints for Mentors to create tasks (`POST /tasks`) and for Students to fetch tasks for their assigned cohort (`GET /cohorts/:id/tasks`).

### 🧑‍💻 Abu Talha (Lead) - Submissions & Attendance

**Focus:** Handling the daily, high-volume data entries. Since Abu Talha is bridging frontend and backend, handling these features makes sense as they require the most complex UI forms (bulk attendance tables, file/link upload states).

- **Owned Models:** `Submission`, `Attendance`
- **Owned Routes:** `/api/v1/submissions/*`, `/api/v1/attendance/*`
- **Specific Tasks:**
  1.  **Submission Schema & Logic:** Build `Submission.js` model. Implement student submission logic (`POST /tasks/:taskId/submissions`).
  2.  **Review System:** Implement the endpoint for mentors to grade and provide feedback on submissions (`PATCH /submissions/:id/review`).
  3.  **Attendance Schema & Logic:** Build `Attendance.js` model.
  4.  **Attendance Endpoints:** Implement the bulk upload endpoint for mentors (`POST /attendance/bulk`) and the history fetcher for students (`GET /attendance/student/me`).

---

## 3. Anti-Conflict Rules & Merge Sequence

To guarantee you do not overwrite each other's work, the team MUST follow these rules:

### Rule 1: The `server.js` Bottleneck

Do not all edit `server.js` at the same time to register your routes.

- **Ali Jan** sets up `server.js` first and merges it to `dev`.
- After pulling the latest `dev`, Faisal and Talha can add their route imports (`app.use('/api/v1/cohorts', cohortRoutes)`) to `server.js` in their respective feature branches.

### Rule 2: Cross-Referencing Models

- Faisal and Talha will need the `User` model ID for relations (e.g., a Task created by a Mentor ID).
- **Solution:** While Ali Jan is building the `User` model, Faisal and Talha can use basic Mongoose `ObjectId` references in their schemas. You do not need the finished Auth system to test your routes; you can temporarily hardcode a Mentor/Student ID or mock a JWT token until Abu Talha's PR is merged.

### Rule 3: Strict Folder Boundaries

- If Shah Faisal is working in `controllers/task-controller.js`, Talha should have absolutely no reason to touch that file. Talha should be in `controllers/submission-controller.js`.
- If a feature requires data from both, communicate and decide who handles the cross-over, or write modular helper functions in `/utils`.

### Rule 4: Daily Standup (Sync)

Before starting work, drop a message in your team chat: _"I am branching off dev to work on the Attendance routes today."_ This acts as a lock, letting the others know exactly which files you will be modifying.
