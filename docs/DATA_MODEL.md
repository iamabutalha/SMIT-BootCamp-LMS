# Bootcamp LMS - Data Model

## 1. Core Entities & Relationships

### `User` Collection
Stores all users (Admins, Mentors, Students).
*   `_id`: ObjectId
*   `name`: String (Required)
*   `email`: String (Required, Unique, Indexed)
*   `passwordHash`: String (Required)
*   `role`: String (Enum: `ADMIN`, `MENTOR`, `STUDENT`) - Default: `STUDENT`
*   `cohorts`: Array of ObjectIds (Ref: `Cohort`) - Mentors can manage multiple, students typically belong to one.
*   `createdAt`: Timestamp

### `Cohort` Collection
Represents a specific batch or class of students.
*   `_id`: ObjectId
*   `name`: String (Required) e.g., "Web Dev Fall 2026"
*   `startDate`: Date
*   `endDate`: Date
*   `isActive`: Boolean (Default: true)
*   `createdBy`: ObjectId (Ref: `User` - Admin)

### `Task` Collection
Assignments created by Mentors for a Cohort.
*   `_id`: ObjectId
*   `title`: String (Required)
*   `description`: String (Markdown supported)
*   `cohortId`: ObjectId (Ref: `Cohort`, Indexed)
*   `mentorId`: ObjectId (Ref: `User` - Mentor who created it)
*   `dueDate`: Date
*   `createdAt`: Timestamp

### `Submission` Collection
A Student's response to a Task.
*   `_id`: ObjectId
*   `taskId`: ObjectId (Ref: `Task`, Indexed)
*   `studentId`: ObjectId (Ref: `User`, Indexed)
*   `submissionUrl`: String (GitHub link or hosted URL)
*   `status`: String (Enum: `PENDING`, `REVIEWED`) - Default: `PENDING`
*   `grade`: Number (Optional)
*   `feedback`: String (Optional)
*   `submittedAt`: Timestamp

### `Attendance` Collection
Daily attendance records per student.
*   `_id`: ObjectId
*   `cohortId`: ObjectId (Ref: `Cohort`, Indexed)
*   `studentId`: ObjectId (Ref: `User`, Indexed)
*   `date`: Date (Normalized to YYYY-MM-DD)
*   `status`: String (Enum: `PRESENT`, `ABSENT`, `LATE`, `EXCUSED`)
*   `markedBy`: ObjectId (Ref: `User` - Mentor)

---

## 2. Important Database Indexes
To ensure read operations remain fast as the LMS scales, the following indexes are required:

1.  **User Authentication:** `{ email: 1 }` (Unique) on `User`.
2.  **Student Task Lookup:** `{ studentId: 1, taskId: 1 }` (Unique) on `Submission` to prevent duplicate submissions for the same task.
3.  **Attendance Queries:** `{ cohortId: 1, date: 1 }` on `Attendance` to quickly fetch daily rosters for mentors.
4.  **Attendance Validation:** `{ studentId: 1, date: 1 }` (Unique) on `Attendance` to ensure a student doesn't have conflicting attendance records on the same day.
