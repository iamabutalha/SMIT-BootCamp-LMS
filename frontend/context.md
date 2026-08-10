# SMIT LMS — Frontend Engineering Context

> This document is the primary engineering context for AI-assisted frontend development.
> Read and follow this document before modifying or creating frontend code.
>
> Project: SMIT / Saylani Bootcamp LMS
> Frontend: React + Vite
> State Management: Redux Toolkit + RTK Query
> Styling: Tailwind CSS
> Backend: Node.js + Express + MongoDB
> Team: 3 frontend developers
>
> IMPORTANT:
> Do not invent APIs, fields, roles, routes, or business rules.
> The API contract and this document are the source of truth.

---

# 1. PROJECT PURPOSE

We are building a production-quality Learning Management System (LMS) for a bootcamp.

The LMS has three roles:

- admin
- mentor
- student

The frontend must be:

- modular
- maintainable
- responsive
- reusable
- API-driven
- role-aware
- accessible
- easy for multiple developers to collaborate on
- suitable for future scaling

We are building the frontend from scratch.

The UI/design has been prepared using Figma/Lovable.

The frontend must preserve the approved design while following the engineering architecture defined in this document.

---

# 2. TEAM STRUCTURE

There are three frontend developers.

## Hamza — Foundation + Auth + Shared Infrastructure

Hamza owns:

### Project Foundation

- React/Vite setup
- folder architecture
- environment configuration
- Redux Toolkit configuration
- RTK Query configuration
- API client
- global API behavior
- global error handling

### Routing

- React Router
- public routes
- protected routes
- role-based routes

### Authentication

- login
- register if included in the current API contract
- logout
- JWT/token handling
- current user
- authentication validation

### RBAC

Supported roles:

```text
admin
mentor
student



Shared UI

Hamza owns the initial implementation of:

Button
Input
Select
Textarea
Checkbox
Modal
Card
Badge
Table
Pagination
Spinner
Skeleton
EmptyState
Alert
Dropdown
Avatar
Shared Layout

Hamza owns:

DashboardLayout
Sidebar
Topbar/Navbar
MobileSidebar
Breadcrumbs
AuthLayout

Hamza is responsible for establishing the foundation that other developers consume.




OWNERSHIP RULE

Each developer works primarily inside their assigned domain.

Hamza
├── app/
├── layouts/
├── shared components
├── auth
├── routing
└── API foundation

Faizan
└── features/student-related functionality

Muzamil
└── features/mentor/admin functionality



FRONTEND ARCHITECTURE

The standard structure is:

src/
├── app/
│   ├── store/
│   │   └── store.js
│   │
│   ├── router/
│   │   ├── AppRouter.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── RoleRoute.jsx
│   │
│   └── providers/
│       └── AppProviders.jsx
│
├── assets/
│
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Textarea.jsx
│   │   ├── Checkbox.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── Avatar.jsx
│   │   ├── Modal.jsx
│   │   ├── Dropdown.jsx
│   │   ├── Table.jsx
│   │   ├── Pagination.jsx
│   │   ├── Spinner.jsx
│   │   ├── Skeleton.jsx
│   │   ├── EmptyState.jsx
│   │   ├── Alert.jsx
│   │   └── index.js
│   │
│   └── common/
│       ├── PageHeader.jsx
│       ├── SearchInput.jsx
│       ├── ConfirmDialog.jsx
│       ├── StatusBadge.jsx
│       └── ErrorState.jsx
│
├── layouts/
│   ├── AuthLayout.jsx
│   ├── DashboardLayout.jsx
│   ├── Sidebar.jsx
│   ├── Topbar.jsx
│   ├── MobileSidebar.jsx
│   └── Breadcrumbs.jsx
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── users/
│   ├── batches/
│   ├── attendance/
│   ├── tasks/
│   └── submissions/
│
├── hooks/
├── services/
│   └── api/
│       └── baseApi.js
│
├── constants/
├── utils/
├── styles/
│   ├── globals.css
│   └── theme.css
│
├── App.jsx
└── main.jsx




--------------------------------------------
FEATURE ARCHITECTURE

Feature-specific code belongs inside the feature.

Example:

features/tasks/
├── components/
│   ├── TaskCard.jsx
│   ├── TaskForm.jsx
│   ├── TaskTable.jsx
│   └── TaskStatus.jsx
│
├── pages/
│   ├── TasksPage.jsx
│   └── TaskDetailsPage.jsx
│
├── tasksApi.js
└── index.js

Attendance:

features/attendance/
├── components/
│   ├── AttendanceTable.jsx
│   ├── AttendanceFilters.jsx
│   └── AttendanceSummary.jsx
│
├── pages/
│   ├── AttendancePage.jsx
│   └── StudentAttendancePage.jsx
│
├── attendanceApi.js
└── index.js

Do not put feature-specific components inside components/ui.

8. SHARED COMPONENT RULE

Before creating a component, determine its scope.

components/ui

Use for generic reusable UI.

Examples:

Button
Input
Card
Modal
Table
Badge
Spinner
Skeleton

These components must NOT know about LMS business logic.

Bad:

AttendanceButton.jsx inside components/ui

Good:

components/ui/Button.jsx
components/common

Use for reusable application-level components.

Examples:

PageHeader
SearchInput
ConfirmDialog
StatusBadge
ErrorState

These can have some LMS application context but should remain reusable.

features/<feature>/components

Use for feature-specific components.

Examples:

features/tasks/components/TaskCard.jsx
features/attendance/components/AttendanceTable.jsx
features/submissions/components/SubmissionReview.jsx
9. STATE MANAGEMENT

We use Redux Toolkit.

We also use RTK Query for server state.

Redux should manage client/application state.

Examples:

authentication state when required
UI state
sidebar state
global preferences
other true client-side state
RTK Query manages server state.

Examples:

users
batches
tasks
submissions
attendance
dashboard data

Do not manually duplicate server data into Redux slices unless there is a clear engineering reason.

10. RTK QUERY ARCHITECTURE

There should be one base API.

services/
└── api/
    └── baseApi.js

Feature APIs extend the base API.

Example:

features/
├── auth/authApi.js
├── users/usersApi.js
├── batches/batchesApi.js
├── attendance/attendanceApi.js
├── tasks/tasksApi.js
└── submissions/submissionsApi.js

Conceptually:

baseApi
   │
   ├── authApi
   ├── usersApi
   ├── batchesApi
   ├── attendanceApi
   ├── tasksApi
   └── submissionsApi

Do NOT create a separate Redux store for each feature.

Do NOT create a separate Axios instance for every feature unless explicitly required.

11. API RULES

The backend API contract is the source of truth.

Base URL:

/api

Authentication:

Authorization: Bearer <token>

Standard success response:

{
  "success": true,
  "message": "Human-readable message",
  "data": {}
}

Standard error:

{
  "success": false,
  "message": "Human-readable message",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": []
  }
}

Do not assume a different response format.

12. CURRENT API ENTITIES

The API contract defines:

User
Batch
Attendance
Task
Submission

Do not rename these entities in frontend code without a team decision.

The backend contract uses:

batch
batchId
mentorId
studentId
taskId
submission
13. API ENDPOINTS
Auth
POST /api/auth/login
GET  /api/auth/me
Users
POST   /api/users
GET    /api/users
GET    /api/users/:id
PATCH  /api/users/:id
DELETE /api/users/:id
Batches
POST  /api/batches
GET   /api/batches
GET   /api/batches/:id
PATCH /api/batches/:id
GET   /api/batches/:id/students
Attendance
POST  /api/attendance
GET   /api/attendance
GET   /api/attendance/student/:studentId
PATCH /api/attendance/:id
Tasks
POST   /api/tasks
GET    /api/tasks
GET    /api/tasks/:id
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
Submissions
POST  /api/tasks/:id/submit
GET   /api/tasks/:id/submissions
PATCH /api/submissions/:id
GET   /api/submissions/student/:studentId
Progress
GET /api/students/:id/progress
GET /api/batches/:id/dashboard
14. IMPORTANT API CONTRACT RULE

If an API required by a screen does not exist:

DO NOT invent it.

Example:

If the UI needs:

GET /api/tasks/my-tasks

but the API contract only defines:

GET /api/tasks

use the defined API if it supports the requirement.

Otherwise report:

Required API is missing from API Contract.

Then coordinate with the backend developer.

Never silently create a fake endpoint.

15. MOCK DATA RULE

Mock data may be used temporarily for UI development.

However:

clearly label mock data
keep it local to the feature
do not mix mock data into RTK Query
remove mock data when backend integration is complete

Never pretend mock data is real API data.

16. AUTHENTICATION

Authentication uses JWT.

Login:

POST /api/auth/login

Returns:

{
  "success": true,
  "message": "Logged in",
  "data": {
    "token": "jwt...",
    "user": {}
  }
}

Current user:

GET /api/auth/me

Password must never be stored in frontend state.

The frontend must never display or log passwords.

17. RBAC

Roles are exactly:

admin
mentor
student

Role checks must use centralized constants.

Example:

ROLES.ADMIN
ROLES.MENTOR
ROLES.STUDENT

Do not scatter random role strings throughout the application.

18. ROUTING

Routes should be centralized.

Use:

AppRouter
ProtectedRoute
RoleRoute

Public pages:

/login

Protected pages must require authentication.

Role-specific pages must require the appropriate role.

Frontend role checks are for UI/navigation protection.

The backend remains the final authority for authorization.

19. DESIGN SYSTEM

The application follows the approved Figma/Lovable design.

Do not randomly introduce new colors.

Use centralized design tokens.

Recommended concepts:

primary
primary-hover
background
surface
text-primary
text-secondary
border
success
warning
danger
info

Typography, spacing, radius and shadows should also be centralized.

Before creating a new design token, check whether an existing token can be reused.

20. TAILWIND RULES

Use Tailwind utilities.

Prefer:

className="bg-primary text-white rounded-lg"

over creating unnecessary CSS classes.

Do not use random Tailwind colors throughout the project:

bg-blue-500
bg-red-600
bg-green-400

when the design system already defines semantic tokens.

Use the design system.

21. COMPONENT REUSE

Before creating a new component:

Search components/ui.
Search components/common.
Search the current feature.
Reuse an existing component if possible.
Only create a new component if the existing component cannot reasonably support the requirement.

Do not create duplicate components such as:

PrimaryButton.jsx
MainButton.jsx
ActionButton.jsx
BlueButton.jsx

when Button.jsx can handle the variants.

22. PAGE STATE REQUIREMENTS

Every API-driven page should consider:

Loading
Success
Empty
Error

Example:

if (isLoading) {
  return <Skeleton />;
}

if (error) {
  return <ErrorState />;
}

if (!items?.length) {
  return <EmptyState />;
}

return <Content />;

Do not leave blank screens during loading or errors.

23. FORMS

Use:

React Hook Form
Zod
@hookform/resolvers

for complex forms.

Validation should happen before submitting to the API.

Example architecture:

TaskForm.jsx
     │
React Hook Form
     │
Zod schema
     │
RTK Query mutation
     │
Backend

Do not duplicate the same validation rules across multiple components unnecessarily.

24. API ERROR HANDLING

Do not expose raw technical errors to users.

Bad:

AxiosError: ERR_NETWORK

Better:

Unable to load tasks. Please try again.

Use the backend's:

message
error.code
error.details

when available.

25. SECURITY RULES

Never commit:

.env
JWT secrets
API secrets
passwords
database credentials
private keys

Never log:

password
JWT
sensitive authentication data

Do not trust frontend role checks for backend authorization.