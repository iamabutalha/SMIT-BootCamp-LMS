# SMIT Bootcamp LMS — API Contract (v1)

> **Purpose:** the single source of truth for every API endpoint. Frontend and backend both code against this file. If you change an endpoint or a field, edit this file **in the same pull request** — never change an endpoint silently.
>
> **This file is authoritative.** It supersedes the old duplicate contract (now deleted). Where other docs disagree, this file wins for API shape.
>
> **Stack:** Node + Express + MongoDB (Mongoose). All IDs are Mongo `ObjectId` strings.
> **Base URL:** `/api/v1`
> **Owner of this file:** Backend lead (edits reviewed by the team)

---

## 0. Conventions (read this first)

### Auth
- Auth is via **JWT** in the header: `Authorization: Bearer <token>`.
- Token is returned by `POST /api/v1/auth/register` and `POST /api/v1/auth/login`.
- The token is stored in `localStorage` on the frontend (team decision, 2026-08-06 — reassessed in Phase 2).
- Every endpoint below is **protected** unless it says `Public`.

### Roles
Three roles only in v1: `ADMIN`, `MENTOR`, `STUDENT` (always UPPERCASE).
Each endpoint lists who is allowed to call it. Default role on self-registration is `STUDENT`.

### Standard response envelope
**Every** response uses this shape. No exceptions — this is what stops the frontend from guessing.

Success:
```json
{
  "success": true,
  "message": "Human-readable message",
  "data": { }
}
```

Error:
```json
{
  "success": false,
  "message": "Human-readable message",
  "errors": [
    { "field": "email", "message": "Email is already in use." }
  ]
}
```
> `errors` is optional and is used mainly for validation failures. Non-validation errors may omit it.

### Status codes we use
| Code | When |
|------|------|
| 200  | OK (GET / update success) |
| 201  | Created (POST that makes a new record) |
| 400  | Bad request / validation failed |
| 401  | No/invalid token |
| 403  | Logged in but not allowed (wrong role) |
| 404  | Not found |
| 409  | Conflict (e.g. email exists, attendance already marked) |
| 500  | Server error |

### Pagination (for list endpoints)
Query params: `?page=1&limit=20`
List responses put items in `data.items` and add `data.pagination`:
```json
"pagination": { "page": 1, "limit": 20, "total": 134, "totalPages": 7 }
```

---

## 1. Data Model (the entities every endpoint returns)

Lock these field names now. If a name changes, it changes here first.

### User
```json
{
  "_id": "ObjectId",
  "name": "Ali Jan",
  "email": "ali@example.com",
  "phone": "+92xxxxxxxxxx",       // optional
  "role": "STUDENT",              // "ADMIN" | "MENTOR" | "STUDENT"
  "cohortId": "ObjectId | null",  // the cohort a student/mentor belongs to
  "isActive": true,
  "createdAt": "ISODate"
}
```
> Password is **never** returned in any response.

### Cohort
```json
{
  "_id": "ObjectId",
  "name": "MERN Batch 12",
  "course": "Full Stack MERN",
  "mentorId": "ObjectId | null",  // assigned mentor
  "startDate": "ISODate",
  "endDate": "ISODate | null",
  "isActive": true,
  "createdBy": "ObjectId",        // admin who created it
  "createdAt": "ISODate"
}
```

### Attendance
```json
{
  "_id": "ObjectId",
  "studentId": "ObjectId",
  "cohortId": "ObjectId",
  "date": "2026-08-06",          // one record per student per day
  "status": "PRESENT",           // "PRESENT" | "ABSENT" | "LATE" | "EXCUSED"
  "markedBy": "ObjectId",        // mentor/admin who marked it
  "createdAt": "ISODate"
}
```

### Task
```json
{
  "_id": "ObjectId",
  "cohortId": "ObjectId",
  "title": "Build a REST API for auth",
  "description": "…",             // markdown supported
  "dueDate": "ISODate",
  "createdBy": "ObjectId",       // mentor
  "isActive": true,
  "createdAt": "ISODate"
}
```

### Submission
```json
{
  "_id": "ObjectId",
  "taskId": "ObjectId",
  "studentId": "ObjectId",
  "status": "PENDING",           // "PENDING" | "SUBMITTED" | "REVIEWED"
  "link": "https://github.com/... | null",
  "note": "string | null",
  "grade": "Number | null",      // set on review
  "feedback": "string | null",   // set on review
  "submittedAt": "ISODate | null",
  "reviewedBy": "ObjectId | null",
  "createdAt": "ISODate"
}
```
> Rule: when a mentor creates a Task, a `Submission` with `status: "PENDING"` is auto-created for every student in the cohort. That way "who hasn't done it" is always answerable.

---

## 2. Auth

### `POST /api/v1/auth/register` — Public
Student self-registration. Role is always forced to `STUDENT` (you cannot self-register as admin/mentor).
**Body:**
```json
{ "name": "Jane Doe", "email": "jane@example.com", "password": "secret123", "phone": "+92..." }
```
**201:**
```json
{
  "success": true,
  "message": "Registered",
  "data": { "token": "jwt...", "user": { /* User */ } }
}
```
**409:** email already exists.

### `POST /api/v1/auth/login` — Public
Log in, get a token.
**Body:**
```json
{ "email": "ali@example.com", "password": "secret123" }
```
**200:**
```json
{
  "success": true,
  "message": "Logged in",
  "data": { "token": "jwt...", "user": { /* User */ } }
}
```

### `GET /api/v1/auth/me` — any logged-in user
Returns the current user from the token.
**200:** `data: { /* User */ }`

---

## 3. Users

### `POST /api/v1/users` — **ADMIN**
Admin creates a mentor or student directly (any role, unlike public register).
**Body:**
```json
{ "name": "…", "email": "…", "phone": "…", "password": "…", "role": "STUDENT", "cohortId": "ObjectId" }
```
**201:** `data: { /* User */ }`
**409:** email already exists.

### `GET /api/v1/users` — **ADMIN**
List users. Filters: `?role=STUDENT&cohortId=…&page=1&limit=20`
**200:** `data: { items: [User], pagination }`

### `GET /api/v1/users/:id` — **ADMIN**, or the user themselves
**200:** `data: { /* User */ }`

### `PATCH /api/v1/users/:id` — **ADMIN**
Update name/phone/role/cohortId/isActive.
**200:** `data: { /* User */ }`

### `PATCH /api/v1/users/:id/role` — **ADMIN**
Dedicated role-change endpoint (elevate a student to mentor/admin).
**Body:** `{ "role": "MENTOR" }`
**200:** `data: { /* User */ }`

### `DELETE /api/v1/users/:id` — **ADMIN**
Soft delete (sets `isActive: false`).
**200:** `data: { "_id": "…" }`

---

## 4. Cohorts

### `POST /api/v1/cohorts` — **ADMIN**
**Body:** `{ "name", "course", "mentorId", "startDate", "endDate" }`
**201:** `data: { /* Cohort */ }`

### `GET /api/v1/cohorts` — **ADMIN, MENTOR**
Mentor sees only their own cohorts.
**200:** `data: { items: [Cohort], pagination }`

### `GET /api/v1/cohorts/:id` — **ADMIN, MENTOR(owner)**
**200:** `data: { /* Cohort */ }`

### `PATCH /api/v1/cohorts/:id` — **ADMIN**
**200:** `data: { /* Cohort */ }`

### `POST /api/v1/cohorts/:id/assign-mentor` — **ADMIN**
**Body:** `{ "mentorId": "ObjectId" }`
**200:** `data: { /* Cohort */ }`

### `GET /api/v1/cohorts/:id/students` — **ADMIN, MENTOR(owner)**
List students in a cohort.
**200:** `data: { items: [User] }`

---

## 5. Attendance

### `POST /api/v1/attendance` — **MENTOR, ADMIN**
Mark attendance for a whole cohort for one date, in one call (bulk = fewer requests = less conflict).
**Body:**
```json
{
  "cohortId": "ObjectId",
  "date": "2026-08-06",
  "records": [
    { "studentId": "ObjectId", "status": "PRESENT" },
    { "studentId": "ObjectId", "status": "ABSENT" }
  ]
}
```
**201:** `data: { "marked": 24 }`
**409:** attendance for that cohort+date already exists (use PATCH to fix).

### `GET /api/v1/attendance` — **MENTOR(owner), ADMIN**
Query: `?cohortId=…&date=2026-08-06`
**200:** `data: { items: [Attendance] }`

### `GET /api/v1/attendance/student/:studentId` — **ADMIN, MENTOR(owner), that student**
History + summary.
**200:**
```json
{
  "success": true,
  "data": {
    "summary": { "present": 40, "absent": 5, "late": 2, "excused": 1, "percentage": 85.1 },
    "items": [ /* Attendance */ ]
  }
}
```

### `PATCH /api/v1/attendance/:id` — **MENTOR(owner), ADMIN**
Fix one record (e.g. mistake).
**Body:** `{ "status": "LATE" }`
**200:** `data: { /* Attendance */ }`

---

## 6. Tasks

### `POST /api/v1/tasks` — **MENTOR(owner), ADMIN**
Assign a task to a cohort. Auto-creates a `PENDING` Submission per student.
**Body:** `{ "cohortId", "title", "description", "dueDate" }`
**201:** `data: { /* Task */ }`

### `GET /api/v1/tasks` — **MENTOR(owner), STUDENT(their cohort), ADMIN**
Query: `?cohortId=…`
**200:** `data: { items: [Task] }`

### `GET /api/v1/tasks/:id` — same roles as above
**200:** `data: { /* Task */ }`

### `PATCH /api/v1/tasks/:id` — **MENTOR(owner), ADMIN**
**200:** `data: { /* Task */ }`

### `DELETE /api/v1/tasks/:id` — **MENTOR(owner), ADMIN**
Soft delete.
**200:** `data: { "_id": "…" }`

---

## 7. Submissions

### `POST /api/v1/tasks/:id/submissions` — **STUDENT (own submission only)**
Student submits work for a task. Flips their submission `PENDING → SUBMITTED`.
**Body:** `{ "link": "https://github.com/…", "note": "optional" }`
**200:** `data: { /* Submission */ }`

### `GET /api/v1/tasks/:id/submissions` — **MENTOR(owner), ADMIN**
All submissions for a task (who's done, who's pending).
**200:** `data: { items: [Submission] }`

### `PATCH /api/v1/submissions/:id/review` — **MENTOR(owner), ADMIN**
Review: mark `REVIEWED` with grade + feedback (or back to `PENDING` if rejected).
**Body:** `{ "status": "REVIEWED", "grade": 95, "feedback": "Great routing logic!" }`
**200:** `data: { /* Submission */ }`

### `GET /api/v1/submissions/student/:studentId` — **ADMIN, MENTOR(owner), that student**
A student's submissions across all their tasks.
**200:** `data: { items: [Submission] }`

---

## 8. Progress & Dashboard

### `GET /api/v1/students/:id/progress` — **ADMIN, MENTOR(owner), that student**
The per-student summary card.
**200:**
```json
{
  "success": true,
  "data": {
    "studentId": "ObjectId",
    "attendance": { "percentage": 85.1, "present": 40, "absent": 5, "late": 2, "excused": 1 },
    "tasks": { "total": 20, "reviewed": 15, "submitted": 2, "pending": 3 }
  }
}
```

### `GET /api/v1/cohorts/:id/dashboard` — **MENTOR(owner), ADMIN**
The screen that matters most: at-risk students flagged.
**200:**
```json
{
  "success": true,
  "data": {
    "cohortId": "ObjectId",
    "studentCount": 24,
    "atRisk": [
      { "studentId": "…", "name": "…", "reason": "3 absents + 2 pending tasks" }
    ]
  }
}
```
> "At-risk" rule for v1 (tune later): attendance < 75% **or** 3+ pending tasks past due.

---

## 9. Ownership & merge sequence (see BACKEND_TASK_DELEGATION.md)

- **Ali Jan** — Auth + Users (§2, §3), server/config/middleware foundation. Merges first.
- **Shah Faisal** — Cohorts + Tasks (§4, §6).
- **Abu Talha** — Attendance + Submissions + Dashboard (§5, §7, §8).

## 10. Decisions locked for v1

- [x] **Sign-up:** both — public `/auth/register` (STUDENT only) **and** admin `POST /users` (any role).
- [x] **Roles:** `ADMIN | MENTOR | STUDENT` (UPPERCASE).
- [x] **Entity name:** `Cohort` (`cohortId`), not "Batch".
- [x] **Base URL:** `/api/v1`.
- [x] **Error envelope:** `errors: [{ field, message }]` (per CODING_STANDARDS.md).
- [x] **One mentor per cohort** (single `mentorId`).
- [x] **Attendance:** bulk-per-day (one call marks the whole cohort).
- [x] **Timezone:** store dates as UTC, display in PKT on the frontend.
- [ ] **Password reset:** out of scope for v1.
