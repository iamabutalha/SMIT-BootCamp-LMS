# Bootcamp LMS - Feature Specifications

**Target Architecture:** MERN Stack (MongoDB, Express, React/Next.js, Node.js)  
**Frontend Ecosystem:** Tailwind CSS, Vite  
**Core Team:** Abu Talha(lead), Ali Jan(Full stack), Shah Faisal(backend), Muzamil(frontend), Faizan(frontend), Hamza(frontend)

## 1. Core Architecture & Role-Based Access Control (RBAC)

The foundation of the LMS relies on strict access control.

- **Student (Default):** Self-registers. Access is restricted to assigned cohorts, personal task submissions, and own attendance records.
- **Mentor:** Pre-seeded or elevated by Admin. Manages assigned cohorts, marks attendance, creates/assigns tasks, and reviews student submissions.
- **Admin:** Pre-seeded. Superuser access. Can elevate Students to Mentor/Admin roles, manage global system settings, oversee all cohorts, and view system-wide analytics.

---

## 2. Phase-Wise Feature Rollout

### Phase 1: Minimum Viable Product (MVP) - Core Workflow

_Focus: Establishing basic operations, user onboarding, and the core bootcamp loop (tasks & attendance)._

- **Authentication & Authorization**
  - JWT-based authentication.
  - Student self-registration portal.
  - Role middleware securing Admin/Mentor API routes.
- **Cohort & Batch Management**
  - Admins can create new cohorts/batches (e.g., "Full Stack Web Dev - Fall 2026").
  - Mentors can be assigned to specific cohorts.
  - Students enroll or are placed into these cohorts.
- **Attendance Tracking**
  - Mentors view a roster for their cohort to mark daily/session attendance (Present, Absent, Late, Excused).
  - Students can view their overall attendance percentage and daily history.
- **Task/Assignment Management**
  - Mentors can create tasks (title, markdown description, deadline, reference links).
  - Students view pending tasks and submit work (accepting GitHub repo links, hosted URLs, or file uploads).
  - Mentors review submissions, leave feedback comments, and update status (Complete/Incomplete or Grade).

### Phase 2: Engagement & Content Delivery

_Focus: Organizing learning materials and improving the feedback loop between mentors and students._

- **Curriculum & Module Management**
  - Admins/Mentors can build structured curriculum modules (e.g., "Week 1: React Basics").
  - Attach resources (PDFs, video links, code snippets) directly to modules.
- **Advanced Review System**
  - Rubric-based grading system for objective evaluations.
  - Mentor ability to request resubmissions with specific revision notes.
- **Notifications & Alerts**
  - In-app and email notifications for upcoming deadlines, newly graded tasks, and attendance warnings.
- **Discussion & Support**
  - Contextual Q&A threads attached to specific tasks or modules where students can ask questions and mentors can clarify.

### Phase 3: Scale & Analytics

_Focus: Automation, professional integrations, and data-driven administrative insights._

- **System Analytics Dashboard**
  - **Admin View:** Overall bootcamp performance, mentor activity metrics, student retention/drop-off rates.
  - **Mentor View:** Cohort health, flagging "students at risk" based on low attendance or poor task performance.
- **Automated Integrations**
  - GitHub API integration to automatically verify student commits or PRs for code-based tasks.
  - Webhook capabilities (e.g., Discord/Slack integration for automated announcements when a new task is posted).
- **Certification & Export**
  - Automated generation of completion certificates for passing students.
  - Export attendance and grading data to CSV/Excel formats for administrative record-keeping.

---

## 3. Scalability & Technical Considerations

- **Database Design:** Utilizing a NoSQL approach allows flexible schemas for various task types, but requires strict validation at the API layer for RBAC and relational integrity (e.g., securely linking submissions to specific tasks and users).
- **Asset Storage:** Offload submission files, images, and attachments to cloud storage (like AWS S3 or Cloudinary) to keep the core database lightweight.
- **Pagination & Caching:** Implement pagination on all list endpoints (users, tasks, submissions) from Phase 1 to prevent API bottlenecks as the bootcamp grows.
