# Bootcamp LMS — Frontend Required APIs Specification

## 1. Purpose

This document serves as the official API requirement specification and implementation blueprint for the **Bootcamp Management LMS** backend development team. 

It maps every frontend module (Dashboard, Students Roster, Student Details & Performance, Attendance Management, Teams/Cohorts, Tasks, Assignments, and System Progress) to the backend REST API endpoints.

It details:
1. **Existing Backend APIs** (already implemented and ready for consumption).
2. **Missing Backend APIs** (P0, P1, and P2 prioritized specifications).
3. **Database & Schema Model Gaps** (schema fields required by the UI that must be added to Mongoose models).
4. **Implementation Specifications** (exact paths, HTTP methods, authorization levels, query parameters, request payloads, success response envelopes, and error codes).

---

## 2. Existing Backend API Summary

The existing backend is built with **Node.js, Express 5, MongoDB / Mongoose**, and **JWT authentication**. All successful responses adhere to the standardized API response envelope:

```json
{
  "success": true,
  "message": "Human-readable message",
  "data": { ... }
}
```

Paginated endpoints return:
```json
{
  "success": true,
  "message": "Users fetched",
  "data": {
    "items": [ ... ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  }
}
```

### Complete Inventory of Currently Implemented Endpoints

#### 1. System Health
- **METHOD**: `GET`
- **PATH**: `/api/v1/health`
- **PURPOSE**: API uptime check and deploy smoke test.
- **AUTH REQUIRED**: No
- **ROLE**: Public
- **RESPONSE (200 OK)**:
  ```json
  {
    "success": true,
    "message": "API is healthy",
    "data": { "uptime": 142.5 }
  }
  ```

#### 2. Student Self-Registration
- **METHOD**: `POST`
- **PATH**: `/api/v1/auth/register`
- **PURPOSE**: Public student account self-registration. Forced to `STUDENT` role.
- **AUTH REQUIRED**: No
- **ROLE**: Public
- **REQUEST BODY**:
  ```json
  {
    "name": "Muhammad Ali",
    "email": "ali@example.com",
    "password": "Password123!",
    "phone": "+923001234567"
  }
  ```
- **RESPONSE (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Registered",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
      "user": {
        "_id": "67b0a123f4567890abcdef01",
        "name": "Muhammad Ali",
        "email": "ali@example.com",
        "role": "STUDENT",
        "phone": "+923001234567",
        "cohortId": null,
        "isActive": true,
        "createdAt": "2026-08-11T06:00:00.000Z"
      }
    }
  }
  ```

#### 3. User Login
- **METHOD**: `POST`
- **PATH**: `/api/v1/auth/login`
- **PURPOSE**: Authenticate user and issue JWT bearer token.
- **AUTH REQUIRED**: No
- **ROLE**: Public
- **REQUEST BODY**:
  ```json
  {
    "email": "admin@saylani.com",
    "password": "AdminPassword123!"
  }
  ```
- **RESPONSE (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Logged in",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
      "user": {
        "_id": "67b0a123f4567890abcdef00",
        "name": "Super Admin",
        "email": "admin@saylani.com",
        "role": "ADMIN",
        "isActive": true
      }
    }
  }
  ```

#### 4. Get Current User Profile
- **METHOD**: `GET`
- **PATH**: `/api/v1/auth/me`
- **PURPOSE**: Returns authenticated user profile based on Bearer JWT.
- **AUTH REQUIRED**: Yes (`verifyToken`)
- **ROLE**: Any (`ADMIN`, `MENTOR`, `STUDENT`)
- **RESPONSE (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Current user",
    "data": {
      "_id": "67b0a123f4567890abcdef00",
      "name": "Super Admin",
      "email": "admin@saylani.com",
      "role": "ADMIN",
      "isActive": true
    }
  }
  ```

#### 5. Admin Create User
- **METHOD**: `POST`
- **PATH**: `/api/v1/users`
- **PURPOSE**: Admin creates a new user account with specified role (`ADMIN`, `MENTOR`, `STUDENT`).
- **AUTH REQUIRED**: Yes (`verifyToken`)
- **ROLE**: `ADMIN`
- **REQUEST BODY**:
  ```json
  {
    "name": "Usman Ghani",
    "email": "usman@example.com",
    "password": "UserPassword123!",
    "role": "MENTOR",
    "phone": "+923009876543",
    "cohortId": "67b0b234f5678901bcdef02"
  }
  ```
- **RESPONSE (201 Created)**:
  ```json
  {
    "success": true,
    "message": "User created",
    "data": {
      "_id": "67b0c345f6789012cdef03",
      "name": "Usman Ghani",
      "email": "usman@example.com",
      "role": "MENTOR",
      "phone": "+923009876543",
      "cohortId": "67b0b234f5678901bcdef02",
      "isActive": true
    }
  }
  ```

#### 6. Admin List Users (Filter & Paginated)
- **METHOD**: `GET`
- **PATH**: `/api/v1/users`
- **PURPOSE**: Paginated list of users with optional role & cohort filters.
- **AUTH REQUIRED**: Yes (`verifyToken`)
- **ROLE**: `ADMIN`
- **QUERY PARAMETERS**:
  - `role` (optional): `STUDENT` | `MENTOR` | `ADMIN`
  - `cohortId` (optional): ObjectId string
  - `page` (optional): Number (default `1`)
  - `limit` (optional): Number (default `20`)
- **RESPONSE (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Users fetched",
    "data": {
      "items": [
        {
          "_id": "67b0a123f4567890abcdef01",
          "name": "Muhammad Ali",
          "email": "ali@example.com",
          "role": "STUDENT",
          "cohortId": "67b0b234f5678901bcdef02",
          "isActive": true
        }
      ],
      "pagination": {
        "page": 1,
        "limit": 20,
        "total": 1,
        "totalPages": 1
      }
    }
  }
  ```

#### 7. Get Single User Details
- **METHOD**: `GET`
- **PATH**: `/api/v1/users/:id`
- **PURPOSE**: Get single user profile by ID.
- **AUTH REQUIRED**: Yes (`verifyToken`)
- **ROLE**: `ADMIN` or the user matching `:id`
- **RESPONSE (200 OK)**:
  ```json
  {
    "success": true,
    "message": "User fetched",
    "data": {
      "_id": "67b0a123f4567890abcdef01",
      "name": "Muhammad Ali",
      "email": "ali@example.com",
      "role": "STUDENT",
      "phone": "+923001234567",
      "cohortId": "67b0b234f5678901bcdef02",
      "isActive": true
    }
  }
  ```

#### 8. Update User Profile Fields
- **METHOD**: `PATCH`
- **PATH**: `/api/v1/users/:id`
- **PURPOSE**: Update user whitelisted fields (`name`, `phone`, `role`, `cohortId`, `isActive`).
- **AUTH REQUIRED**: Yes (`verifyToken`)
- **ROLE**: `ADMIN`
- **REQUEST BODY**:
  ```json
  {
    "name": "Muhammad Ali Khan",
    "phone": "+923001112233"
  }
  ```
- **RESPONSE (200 OK)**:
  ```json
  {
    "success": true,
    "message": "User updated",
    "data": {
      "_id": "67b0a123f4567890abcdef01",
      "name": "Muhammad Ali Khan",
      "email": "ali@example.com",
      "role": "STUDENT",
      "phone": "+923001112233",
      "isActive": true
    }
  }
  ```

#### 9. Update User Role
- **METHOD**: `PATCH`
- **PATH**: `/api/v1/users/:id/role`
- **PURPOSE**: Change role of a user.
- **AUTH REQUIRED**: Yes (`verifyToken`)
- **ROLE**: `ADMIN`
- **REQUEST BODY**:
  ```json
  {
    "role": "MENTOR"
  }
  ```
- **RESPONSE (200 OK)**:
  ```json
  {
    "success": true,
    "message": "User role updated",
    "data": {
      "_id": "67b0a123f4567890abcdef01",
      "role": "MENTOR"
    }
  }
  ```

#### 10. Soft Delete User
- **METHOD**: `DELETE`
- **PATH**: `/api/v1/users/:id`
- **PURPOSE**: Deactivates user account (`isActive: false`).
- **AUTH REQUIRED**: Yes (`verifyToken`)
- **ROLE**: `ADMIN`
- **RESPONSE (200 OK)**:
  ```json
  {
    "success": true,
    "message": "User deactivated",
    "data": {
      "_id": "67b0a123f4567890abcdef01"
    }
  }
  ```

#### 11. Upload / Update Profile Image
- **METHOD**: `PATCH`
- **PATH**: `/api/v1/users/:id/profile-image`
- **PURPOSE**: Upload profile avatar image to Cloudinary and attach URL to user record.
- **AUTH REQUIRED**: Yes (`verifyToken`)
- **ROLE**: `ADMIN` or the user matching `:id`
- **REQUEST PAYLOAD**: `multipart/form-data` with field `profileImage`
- **RESPONSE (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Profile image updated successfully",
    "data": {
      "_id": "67b0a123f4567890abcdef01",
      "profileImage": {
        "url": "https://res.cloudinary.com/saylani-lms/image/upload/v17234000/profiles/avatar.png",
        "publicId": "saylani-lms/profiles/avatar"
      }
    }
  }
  ```

---

## 3. Authentication APIs

### Existing
- `POST /api/v1/auth/register` (Public)
- `POST /api/v1/auth/login` (Public)
- `GET /api/v1/auth/me` (Authenticated)

### Required Missing Authentication APIs

#### POST /api/v1/auth/logout
- **Purpose**: Blacklist / invalidate current JWT token on server-side or clear cookie token.
- **Authentication**: Required (`verifyToken`)
- **Role**: Any (`ADMIN`, `MENTOR`, `STUDENT`)
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully",
    "data": null
  }
  ```

#### POST /api/v1/auth/change-password
- **Purpose**: Allow logged-in user to change their account password.
- **Authentication**: Required (`verifyToken`)
- **Role**: Any (`ADMIN`, `MENTOR`, `STUDENT`)
- **Request Body**:
  ```json
  {
    "currentPassword": "OldPassword123!",
    "newPassword": "NewSecurePassword456!"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Password changed successfully",
    "data": null
  }
  ```

---

## 4. Dashboard APIs

### Required Missing Endpoint: GET /api/v1/dashboard/stats

- **Method**: `GET`
- **Path**: `/api/v1/dashboard/stats`
- **Purpose**: Provides aggregate overview statistics for the Admin Dashboard home overview.
- **Authentication**: Required (`verifyToken`)
- **Authorization**: `ADMIN`
- **Parameters**: None
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Dashboard analytics metrics retrieved",
    "data": {
      "totalStudents": 142,
      "presentStudentsToday": 130,
      "absentStudentsToday": 8,
      "leaveStudentsToday": 4,
      "todayAttendanceRate": 91.5,
      "totalCohorts": 6,
      "totalTeams": 14,
      "totalActiveTasks": 28,
      "completedTasksCount": 18,
      "pendingTasksCount": 10,
      "overdueTasksCount": 2,
      "taskSummary": {
        "total": 28,
        "completed": 18,
        "pending": 8,
        "overdue": 2
      }
    }
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Token missing or invalid
  - `403 Forbidden`: Insufficient role permissions

---

## 5. Student APIs

### Existing
- `GET /api/v1/users?role=STUDENT` (Lists students with pagination)
- `GET /api/v1/users/:id` (Gets student record)
- `POST /api/v1/users` (Creates student)

### Required Enhancements / Alias Endpoints

#### GET /api/v1/students
- **Method**: `GET`
- **Path**: `/api/v1/students`
- **Purpose**: Convenient alias or dedicated controller query returning only users with `role: "STUDENT"`. Supports searching by name or roll number.
- **Authentication**: Required (`verifyToken`)
- **Authorization**: `ADMIN`, `MENTOR`
- **Query Parameters**:
  - `search` (optional): String (matches `name`, `email`, or `rollNumber`)
  - `cohortId` (optional): String
  - `page` (optional): Number (default `1`)
  - `limit` (optional): Number (default `20`)
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Students fetched successfully",
    "data": {
      "items": [
        {
          "_id": "67b0a123f4567890abcdef01",
          "rollNumber": "102341",
          "name": "Muhammad Ali",
          "email": "ali@example.com",
          "course": "Web & Mobile Dev",
          "batch": "Batch 10",
          "team": "Alpha",
          "isActive": true
        }
      ],
      "pagination": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }
    }
  }
  ```

---

## 6. Student Profile APIs

### Required Missing Endpoint: GET /api/v1/students/:id/full-profile

- **Method**: `GET`
- **Path**: `/api/v1/students/:id/full-profile`
- **Purpose**: Aggregates comprehensive student data required by the Student Profile & Performance UI (User Info, Enrolled Cohort, Assigned Team, Attendance Trend Chart Data, Performance Matrix, and Submissions List).
- **Authentication**: Required (`verifyToken`)
- **Authorization**: `ADMIN`, `MENTOR`, or student matching `:id`
- **Parameters**:
  - `:id` (Path, Required): Student ObjectId string or Roll Number
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Student full profile loaded",
    "data": {
      "student": {
        "_id": "67b0a123f4567890abcdef01",
        "rollNumber": "102341",
        "name": "Muhammad Ali",
        "email": "ali@example.com",
        "phone": "+923001234567",
        "course": "Web & Mobile Dev",
        "batch": "Batch 10",
        "status": "Active",
        "profileImage": { "url": "https://res.cloudinary.com/..." }
      },
      "team": {
        "id": "67b0b234f5678901bcdef02",
        "name": "Team Alpha — Web Development",
        "teamLead": "Muhammad Ali",
        "description": "Full-stack web development team focusing on LMS platforms.",
        "membersCount": 4,
        "progress": 75
      },
      "overview": {
        "attendanceRate": 92,
        "tasksCompleted": 18,
        "tasksTotal": 24,
        "assignmentsCompleted": 14,
        "assignmentsTotal": 18,
        "overallPerformance": 86
      },
      "attendance": {
        "rate": 92,
        "presentCount": 23,
        "absentCount": 2,
        "leaveCount": 1,
        "logs": [
          { "date": "2026-08-11", "day": "Tuesday", "status": "Present", "checkIn": "09:00 AM", "remarks": "On time" }
        ],
        "trend": [
          { "label": "Week 1", "rate": 95 },
          { "label": "Week 2", "rate": 90 },
          { "label": "Week 3", "rate": 92 }
        ]
      },
      "performance": {
        "attendanceScore": 92,
        "taskCompletionScore": 75,
        "assignmentCompletionScore": 78,
        "onTimeSubmissionScore": 88,
        "overallScore": 86,
        "chartData": [
          { "metric": "Attendance", "student": 92, "cohortAverage": 82 },
          { "metric": "Task Completion", "student": 75, "cohortAverage": 70 },
          { "metric": "Assignment Grade", "student": 88, "cohortAverage": 76 }
        ]
      },
      "assignments": [
        {
          "id": "67b0c456f7890123cdef04",
          "title": "React Authentication System",
          "dueDate": "2026-08-10",
          "status": "Completed",
          "score": 92
        }
      ]
    }
  }
  ```

---

## 7. Attendance APIs

### Required Missing Endpoints

#### 1. GET /api/v1/attendance
- **Method**: `GET`
- **Path**: `/api/v1/attendance`
- **Purpose**: Fetch attendance logs filtered by cohort, student, date, year, month, or week.
- **Authentication**: Required (`verifyToken`)
- **Authorization**: `ADMIN`, `MENTOR`
- **Query Parameters**:
  - `cohortId` (optional): ObjectId string
  - `studentId` (optional): ObjectId string
  - `date` (optional): YYYY-MM-DD string
  - `year` (optional): Number (e.g. `2026`)
  - `month` (optional): String (e.g. `August` or `08`)
  - `week` (optional): String (`Week 1`, `Week 2`)
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Attendance records retrieved",
    "data": {
      "summary": {
        "rate": 92,
        "presentCount": 130,
        "absentCount": 8,
        "leaveCount": 4
      },
      "records": [
        {
          "_id": "67b0d567f8901234ddef05",
          "studentId": "67b0a123f4567890abcdef01",
          "studentName": "Muhammad Ali",
          "rollNumber": "102341",
          "date": "2026-08-11",
          "status": "PRESENT",
          "checkIn": "09:00 AM",
          "remarks": "On time"
        }
      ]
    }
  }
  ```

#### 2. POST /api/v1/attendance/mark
- **Method**: `POST`
- **Path**: `/api/v1/attendance/mark`
- **Purpose**: Mark or update attendance for a batch of students on a specific date.
- **Authentication**: Required (`verifyToken`)
- **Authorization**: `ADMIN`, `MENTOR`
- **Request Body**:
  ```json
  {
    "cohortId": "67b0b234f5678901bcdef02",
    "date": "2026-08-11",
    "records": [
      {
        "studentId": "67b0a123f4567890abcdef01",
        "status": "PRESENT",
        "checkIn": "09:00 AM",
        "remarks": "On time"
      },
      {
        "studentId": "67b0a123f4567890abcdef02",
        "status": "ABSENT",
        "remarks": "Unexcused"
      }
    ]
  }
  ```
- **Response (200 OK / 201 Created)**:
  ```json
  {
    "success": true,
    "message": "Attendance submitted successfully",
    "data": { "markedCount": 2 }
  }
  ```

---

## 8. Team / Cohort APIs

### Required Missing Endpoints

#### 1. GET /api/v1/cohorts
- **Method**: `GET`
- **Path**: `/api/v1/cohorts`
- **Purpose**: List all cohorts/teams in the LMS.
- **Authentication**: Required (`verifyToken`)
- **Authorization**: `ADMIN`, `MENTOR`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Cohorts fetched",
    "data": [
      {
        "_id": "67b0b234f5678901bcdef02",
        "name": "Team Alpha — Web Development",
        "course": "Web & Mobile Dev",
        "batch": "Batch 10",
        "teamLead": "Muhammad Ali",
        "membersCount": 4,
        "progress": 75,
        "isActive": true
      }
    ]
  }
  ```

#### 2. GET /api/v1/cohorts/:id
- **Method**: `GET`
- **Path**: `/api/v1/cohorts/:id`
- **Purpose**: Get cohort/team details including assigned student roster and tasks.
- **Authentication**: Required (`verifyToken`)
- **Authorization**: `ADMIN`, `MENTOR`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Cohort details retrieved",
    "data": {
      "_id": "67b0b234f5678901bcdef02",
      "name": "Team Alpha — Web Development",
      "description": "Full-stack web development team focusing on LMS platforms.",
      "teamLead": "Muhammad Ali",
      "progress": 75,
      "members": [
        {
          "_id": "67b0a123f4567890abcdef01",
          "name": "Muhammad Ali",
          "rollNumber": "102341",
          "role": "Team Lead"
        }
      ],
      "tasks": [
        {
          "_id": "67b0e678f9012345edef06",
          "title": "JWT Auth Guards",
          "status": "Completed"
        }
      ]
    }
  }
  ```

#### 3. POST /api/v1/cohorts/:id/members
- **Method**: `POST`
- **Path**: `/api/v1/cohorts/:id/members`
- **Purpose**: Add a student to a cohort/team.
- **Authentication**: Required (`verifyToken`)
- **Authorization**: `ADMIN`, `MENTOR`
- **Request Body**:
  ```json
  {
    "studentId": "67b0a123f4567890abcdef03"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Member added to team successfully",
    "data": { "cohortId": "67b0b234f5678901bcdef02", "studentId": "67b0a123f4567890abcdef03" }
  }
  ```

#### 4. DELETE /api/v1/cohorts/:id/members/:studentId
- **Method**: `DELETE`
- **Path**: `/api/v1/cohorts/:id/members/:studentId`
- **Purpose**: Remove a student from a team.
- **Authentication**: Required (`verifyToken`)
- **Authorization**: `ADMIN`, `MENTOR`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Member removed from team",
    "data": { "studentId": "67b0a123f4567890abcdef03" }
  }
  ```

---

## 9. Task APIs

### Required Missing Endpoints

#### 1. GET /api/v1/tasks
- **Method**: `GET`
- **Path**: `/api/v1/tasks`
- **Purpose**: List assigned tasks with optional cohort, status, or search filters.
- **Authentication**: Required (`verifyToken`)
- **Authorization**: `ADMIN`, `MENTOR`, `STUDENT`
- **Query Parameters**:
  - `cohortId` (optional): String
  - `status` (optional): `Completed` | `In Progress` | `Pending` | `Overdue`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Tasks retrieved",
    "data": [
      {
        "_id": "67b0e678f9012345edef06",
        "title": "JWT Auth Guards",
        "description": "Implement authentication middleware in Express",
        "cohortId": "67b0b234f5678901bcdef02",
        "dueDate": "2026-08-15T23:59:59.000Z",
        "priority": "High",
        "status": "Completed"
      }
    ]
  }
  ```

#### 2. POST /api/v1/tasks
- **Method**: `POST`
- **Path**: `/api/v1/tasks`
- **Purpose**: Mentor/Admin creates a task for a cohort.
- **Authentication**: Required (`verifyToken`)
- **Authorization**: `ADMIN`, `MENTOR`
- **Request Body**:
  ```json
  {
    "title": "Recharts Integration",
    "description": "Integrate interactive area and bar charts for analytics",
    "cohortId": "67b0b234f5678901bcdef02",
    "dueDate": "2026-08-20",
    "priority": "High"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Task created successfully",
    "data": {
      "_id": "67b0f789f0123456fdef07",
      "title": "Recharts Integration",
      "cohortId": "67b0b234f5678901bcdef02",
      "dueDate": "2026-08-20T00:00:00.000Z"
    }
  }
  ```

---

## 10. Assignment & Submission APIs

### Required Missing Endpoints

#### 1. GET /api/v1/submissions
- **Method**: `GET`
- **Path**: `/api/v1/submissions`
- **Purpose**: Fetch student assignment submissions with optional taskId and studentId filters.
- **Authentication**: Required (`verifyToken`)
- **Authorization**: `ADMIN`, `MENTOR`, `STUDENT`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Submissions fetched",
    "data": [
      {
        "_id": "67b10890f1234567adef08",
        "taskId": "67b0e678f9012345edef06",
        "studentId": "67b0a123f4567890abcdef01",
        "submissionUrl": "https://github.com/example/repo",
        "status": "REVIEWED",
        "grade": 92,
        "feedback": "Great work on error middleware!",
        "submittedAt": "2026-08-10T14:30:00.000Z"
      }
    ]
  }
  ```

#### 2. PATCH /api/v1/submissions/:id/grade
- **Method**: `PATCH`
- **Path**: `/api/v1/submissions/:id/grade`
- **Purpose**: Mentor/Admin grades a student submission and provides feedback.
- **Authentication**: Required (`verifyToken`)
- **Authorization**: `ADMIN`, `MENTOR`
- **Request Body**:
  ```json
  {
    "grade": 95,
    "feedback": "Clean architecture and proper prop validation!"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Submission graded successfully",
    "data": {
      "_id": "67b10890f1234567adef08",
      "status": "REVIEWED",
      "grade": 95,
      "feedback": "Clean architecture and proper prop validation!"
    }
  }
  ```

---

## 11. Performance / Progress APIs

### Required Missing Endpoint: GET /api/v1/progress/summary

- **Method**: `GET`
- **Path**: `/api/v1/progress/summary`
- **Purpose**: Provides overall bootcamp learning progress metrics across batches and modules.
- **Authentication**: Required (`verifyToken`)
- **Authorization**: `ADMIN`, `MENTOR`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Progress metrics retrieved",
    "data": {
      "overallBootcampProgress": 84,
      "modulesCompleted": 5,
      "modulesTotal": 8,
      "topPerformingCohort": "Team Alpha — Web Development",
      "averageAttendance": 91.2,
      "averageAssignmentGrade": 85.4
    }
  }
  ```

---

## 12. API Priority Matrix

| Priority | Endpoint | Purpose | Scope |
| :--- | :--- | :--- | :--- |
| **P0** | `GET /api/v1/dashboard/stats` | Admin Dashboard overview metrics | Dashboard |
| **P0** | `GET /api/v1/students/:id/full-profile` | Complete Student Profile & Performance view | Student Profile |
| **P0** | `GET /api/v1/attendance` | Attendance list by student/cohort/date | Attendance |
| **P0** | `POST /api/v1/attendance/mark` | Batch mark student attendance | Attendance |
| **P0** | `GET /api/v1/cohorts` | List teams/cohorts | Teams |
| **P0** | `GET /api/v1/cohorts/:id` | Team workflow details & roster | Teams |
| **P0** | `GET /api/v1/tasks` | Task list & status | Tasks |
| **P0** | `POST /api/v1/tasks` | Create new cohort task | Tasks |
| **P1** | `POST /api/v1/cohorts/:id/members` | Add student to team | Teams |
| **P1** | `DELETE /api/v1/cohorts/:id/members/:id` | Remove student from team | Teams |
| **P1** | `GET /api/v1/submissions` | Student assignment submissions | Assignments |
| **P1** | `PATCH /api/v1/submissions/:id/grade` | Grade student submission | Assignments |
| **P1** | `GET /api/v1/progress/summary` | Overall system progress | Progress |
| **P2** | `POST /api/v1/auth/logout` | Token invalidation | Auth |
| **P2** | `POST /api/v1/auth/change-password` | Password change | Auth |

---

## 13. Backend Model Gaps (Schema Enhancements Required)

The backend developer must add the following missing fields to existing Mongoose schemas:

### 1. `User` Schema (`backend/src/models/user.model.js`)
- `rollNumber`: String (Unique, Indexed, e.g., `'102341'`)
- `course`: String (e.g., `'Web & Mobile Dev'`)
- `batch`: String (e.g., `'Batch 10'`)
- `profileImage`: `{ url: String, publicId: String }` (Already supported in controller, needs schema definition)

### 2. `Cohort` Schema (New Model needed: `backend/src/models/cohort.model.js`)
- `name`: String (Required)
- `course`: String (Required)
- `batch`: String (Required)
- `teamLead`: ObjectId (Ref `User`)
- `description`: String
- `progress`: Number (Default `0`)
- `isActive`: Boolean (Default `true`)

---

## 14. Implementation Notes for Backend Developer

1. **Strict Response Envelope**: Always wrap success responses in `sendSuccess(res, { statusCode, message, data })` from `src/utils/api-response.js`.
2. **Error Handling**: Throw instances of `ApiError` (`ApiError.notFound`, `ApiError.badRequest`, `ApiError.forbidden`, `ApiError.unauthorized`). Express `errorHandler` middleware catches them automatically.
3. **Role Guards**: Secure routes using `verifyToken` and `authorizeRoles('ADMIN', 'MENTOR')`.
4. **Validation**: Use `express-validator` and `validateRequest` middleware for all POST/PATCH payload validations.

---

## 15. Final API Implementation Checklist

- [ ] `GET /api/v1/dashboard/stats` implemented
- [ ] `GET /api/v1/students/:id/full-profile` implemented
- [ ] `GET /api/v1/attendance` implemented
- [ ] `POST /api/v1/attendance/mark` implemented
- [ ] `GET /api/v1/cohorts` implemented
- [ ] `GET /api/v1/cohorts/:id` implemented
- [ ] `POST /api/v1/cohorts/:id/members` implemented
- [ ] `DELETE /api/v1/cohorts/:id/members/:studentId` implemented
- [ ] `GET /api/v1/tasks` implemented
- [ ] `POST /api/v1/tasks` implemented
- [ ] `GET /api/v1/submissions` implemented
- [ ] `PATCH /api/v1/submissions/:id/grade` implemented
- [ ] `GET /api/v1/progress/summary` implemented
- [ ] Mongoose Schema gaps updated (`rollNumber`, `course`, `batch`, `Cohort` model)
- [ ] All endpoints verified with Postman / Integration Tests
