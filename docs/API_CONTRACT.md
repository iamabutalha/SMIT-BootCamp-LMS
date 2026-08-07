# SMIT LMS — API Contract (v1)

> **Purpose:** single source of truth for every API endpoint. Frontend and backend both code against this file. If you change an endpoint or a field, edit this file **in the same pull request** — never change an endpoint silently.
>
> **Stack:** Node + Express + MongoDB (Mongoose). All IDs are Mongo `ObjectId` strings.
> **Base URL:** `/api`
> **Owner of this file:** Backend lead

---

## 0. Conventions (read this first)

### Auth
- Auth is via **JWT** in the header: `Authorization: Bearer <token>`
- Token is returned by `POST /api/auth/login`.
- Every endpoint below is **protected** unless it says `Public`.

### Roles
Three roles only in v1: `admin`, `mentor`, `student`.
Each endpoint lists who is allowed to call it.

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
  "error": { "code": "VALIDATION_ERROR", "details": [] }
}
```

### Status codes we use
| Code | When |
|------|------|
| 200  | OK (GET / update success) |
| 201  | Created (POST that makes a new record) |
| 400  | Bad request / validation failed |
| 401  | No/invalid token |
| 403  | Logged in but not allowed (wrong role) |
| 404  | Not found |
| 409  | Conflict (e.g. attendance already marked) |
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
  "phone": "+92xxxxxxxxxx",
  "role": "student",              // "admin" | "mentor" | "student"
  "batchId": "ObjectId | null",   // student/mentor belongs to a batch
  "isActive": true,
  "createdAt": "ISODate"
}
```
> Password is **never** returned in any response.

### Batch
```json
{
  "_id": "ObjectId",
  "name": "MERN Batch 12",
  "course": "Full Stack MERN",
  "mentorId": "ObjectId",
  "startDate": "ISODate",
  "endDate": "ISODate | null",
  "isActive": true,
  "createdAt": "ISODate"
}
```

### Attendance
```json
{
  "_id": "ObjectId",
  "studentId": "ObjectId",
  "batchId": "ObjectId",
  "date": "2026-08-06",          // one record per student per day
  "status": "present",           // "present" | "absent" | "late"
  "markedBy": "ObjectId",        // mentor/admin who marked it
  "createdAt": "ISODate"
}
```

### Task
```json
{
  "_id": "ObjectId",
  "batchId": "ObjectId",
  "title": "Build a REST API for auth",
  "description": "…",
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
  "status": "submitted",         // "pending" | "submitted" | "completed"
  "link": "https://github.com/... | null",
  "note": "string | null",
  "submittedAt": "ISODate | null",
  "reviewedBy": "ObjectId | null",
  "createdAt": "ISODate"
}
```
> Rule: when a mentor creates a Task, a `Submission` with `status: "pending"` is auto-created for every student in the batch. That way "who hasn't done it" is always answerable.

---

## 2. Auth

### `POST /api/auth/login` — Public
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

### `GET /api/auth/me` — any logged-in user
Returns the current user from the token.
**200:** `data: { /* User */ }`

---

## 3. Users

### `POST /api/users` — **admin**
Create a mentor or student. (No public sign-up in v1 — admin adds people.)
**Body:**
```json
{ "name": "…", "email": "…", "phone": "…", "password": "…", "role": "student", "batchId": "ObjectId" }
```
**201:** `data: { /* User */ }`
**409:** email already exists.

### `GET /api/users` — **admin**
List users. Filters: `?role=student&batchId=…&page=1&limit=20`
**200:** `data: { items: [User], pagination }`

### `GET /api/users/:id` — **admin**, or the user themselves
**200:** `data: { /* User */ }`

### `PATCH /api/users/:id` — **admin**
Update name/phone/role/batchId/isActive.
**200:** `data: { /* User */ }`

### `DELETE /api/users/:id` — **admin**
Soft delete (sets `isActive: false`).
**200:** `data: { "_id": "…" }`

---

## 4. Batches

### `POST /api/batches` — **admin**
**Body:** `{ "name", "course", "mentorId", "startDate" }`
**201:** `data: { /* Batch */ }`

### `GET /api/batches` — **admin, mentor**
Mentor sees only their own batches.
**200:** `data: { items: [Batch], pagination }`

### `GET /api/batches/:id` — **admin, mentor(owner)**
**200:** `data: { /* Batch */ }`

### `PATCH /api/batches/:id` — **admin**
**200:** `data: { /* Batch */ }`

### `GET /api/batches/:id/students` — **admin, mentor(owner)**
List students in a batch.
**200:** `data: { items: [User] }`

---

## 5. Attendance

### `POST /api/attendance` — **mentor, admin**
Mark attendance for a whole batch for one date, in one call (bulk = fewer requests = less conflict).
**Body:**
```json
{
  "batchId": "ObjectId",
  "date": "2026-08-06",
  "records": [
    { "studentId": "ObjectId", "status": "present" },
    { "studentId": "ObjectId", "status": "absent" }
  ]
}
```
**201:** `data: { "marked": 24 }`
**409:** attendance for that batch+date already exists (use PATCH to fix).

### `GET /api/attendance` — **mentor(owner), admin**
Query: `?batchId=…&date=2026-08-06`
**200:** `data: { items: [Attendance] }`

### `GET /api/attendance/student/:studentId` — **admin, mentor(owner), that student**
History + summary.
**200:**
```json
{
  "success": true,
  "data": {
    "summary": { "present": 40, "absent": 5, "late": 2, "percentage": 85.1 },
    "items": [ /* Attendance */ ]
  }
}
```

### `PATCH /api/attendance/:id` — **mentor(owner), admin**
Fix one record (e.g. mistake).
**Body:** `{ "status": "late" }`
**200:** `data: { /* Attendance */ }`

---

## 6. Tasks

### `POST /api/tasks` — **mentor(owner), admin**
Assign a task to a batch. Auto-creates a `pending` Submission per student.
**Body:** `{ "batchId", "title", "description", "dueDate" }`
**201:** `data: { /* Task */ }`

### `GET /api/tasks` — **mentor(owner), student(their batch), admin**
Query: `?batchId=…`
**200:** `data: { items: [Task] }`

### `GET /api/tasks/:id` — same roles as above
**200:** `data: { /* Task */ }`

### `PATCH /api/tasks/:id` — **mentor(owner), admin**
**200:** `data: { /* Task */ }`

### `DELETE /api/tasks/:id` — **mentor(owner), admin**
Soft delete.
**200:** `data: { "_id": "…" }`

---

## 7. Submissions

### `POST /api/tasks/:id/submit` — **student (own submission only)**
Student submits work for a task. Flips their submission `pending → submitted`.
**Body:** `{ "link": "https://github.com/…", "note": "optional" }`
**200:** `data: { /* Submission */ }`

### `GET /api/tasks/:id/submissions` — **mentor(owner), admin**
All submissions for a task (who's done, who's pending).
**200:** `data: { items: [Submission] }`

### `PATCH /api/submissions/:id` — **mentor(owner), admin**
Review: mark `completed` (or back to `pending` if rejected).
**Body:** `{ "status": "completed" }`
**200:** `data: { /* Submission */ }`

### `GET /api/submissions/student/:studentId` — **admin, mentor(owner), that student**
A student's submissions across all their tasks.
**200:** `data: { items: [Submission] }`

---

## 8. Progress & Dashboard

### `GET /api/students/:id/progress` — **admin, mentor(owner), that student**
The per-student summary card.
**200:**
```json
{
  "success": true,
  "data": {
    "studentId": "ObjectId",
    "attendance": { "percentage": 85.1, "present": 40, "absent": 5, "late": 2 },
    "tasks": { "total": 20, "completed": 15, "submitted": 2, "pending": 3 }
  }
}
```

### `GET /api/batches/:id/dashboard` — **mentor(owner), admin**
The screen that matters most: at-risk students flagged.
**200:**
```json
{
  "success": true,
  "data": {
    "batchId": "ObjectId",
    "studentCount": 24,
    "atRisk": [
      { "studentId": "…", "name": "…", "reason": "3 absents + 2 pending tasks" }
    ]
  }
}
```
> "At-risk" rule for v1 (tune later): attendance < 75% **or** 3+ pending tasks past due.

---

## 9. Decisions to lock BEFORE coding (these cause the real conflicts)

- [ ] **Sign-up:** admin-creates-users only? (assumed yes in v1) or student self-register?
- [ ] **Password reset:** in scope for v1? (assumed no)
- [ ] **One mentor per batch**, or many? (contract assumes one `mentorId`)
- [ ] **Attendance:** bulk-per-day only (assumed), or per-student marking too?
- [ ] **Timezone:** store dates as UTC, display in PKT? (recommended: yes)

Tick these off as a team, then this file is frozen for v1.
