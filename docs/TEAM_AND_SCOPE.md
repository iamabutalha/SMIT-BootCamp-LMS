# Bootcamp LMS - Team & Scope

## 1. Core Team Roster & Roles
*   **Abu Talha:** Team Lead (Oversight, architecture, and unblocking).
*   **Ali Jan:** Full Stack Engineering (Bridging frontend and backend, core feature development).
*   **Shah Faisal:** Backend Engineering (Node.js, Express, MongoDB schemas, REST APIs).
*   **Muzamil, Faizan, & Hamza:** Frontend Engineering (React, Vite, Tailwind CSS, API Integration, UI/UX).

## 2. Phase 1 (MVP) Scope - "The Boot Camp Loop"
Our immediate priority is getting the core functionality working. If a feature is not on this list, it belongs in Phase 2.

**In-Scope for V1:**
*   User registration and JWT login.
*   Admin dashboard to create Cohorts and assign Mentors.
*   Mentor ability to create text/markdown-based Tasks.
*   Student ability to submit GitHub links for Tasks.
*   Mentor ability to mark submissions as 'Reviewed' with a numerical grade.
*   Mentor ability to mark daily cohort Attendance (Present/Absent).

**Out-of-Scope for V1:**
*   File uploads (images, PDFs).
*   Email/Slack notifications.
*   Automated GitHub grading.
*   Complex analytics dashboards.

## 3. Decision Log
*   **2026-08-06:** Decided to use standard JWTs stored in `localStorage` for Phase 1 MVP speed, rather than HTTP-only cookies. We will reassess for Phase 2 if security requirements change.
*   **2026-08-06:** Decided on a NoSQL document structure (MongoDB) to allow flexibility in how we define "Tasks" in the future (e.g., quizzes vs. code reviews).
