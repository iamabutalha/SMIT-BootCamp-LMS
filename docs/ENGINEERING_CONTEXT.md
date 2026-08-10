# Bootcamp LMS — Engineering Context

> Team engineering context, architecture rules, AI rules, and collaboration standards.
> Read this document before modifying the codebase.

## 1. Project Overview

We are building a Learning Management System (LMS) from scratch.

Roles:
- `admin`
- `mentor`
- `student`

Current v1 scope:
- Authentication
- User management
- Batch management
- Attendance
- Tasks
- Task submissions
- Student progress
- Mentor/admin dashboards
- Student dashboard

Frontend and backend must remain synchronized through the API contract.

## 2. Stack

### Frontend
- React
- Vite
- JavaScript / JSX
- Tailwind CSS
- React Router
- Redux Toolkit
- RTK Query

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication

### Tools
- Git
- GitHub
- Postman
- Claude / AI coding assistants

## 3. Source of Truth Hierarchy

When documents conflict, follow this order:

1. `docs/API_CONTRACT.md` — API endpoints, methods, request/response structures, roles, status codes.
2. `docs/SYSTEM_DESIGN.md` — overall system architecture.
3. `docs/FRONTEND_GUIDE.md` — frontend architecture and implementation.
4. `docs/BACKEND_GUIDE.md` — backend standards.
5. `docs/CODING_STANDARDS.md` — coding conventions.
6. `docs/GIT_WORKFLOW.md` — branches, commits, PRs.
7. `docs/TEAM_AND_SCOPE.md` — ownership and scope.
8. `docs/FEATURES.md` — product requirements.
9. `docs/ENGINEERING_CONTEXT.md` — general engineering and AI rules.
10. Approved Figma design — visual/UX reference.

If documents conflict:
- Do not guess.
- Do not silently choose one.
- Identify the conflict.
- Ask the team to resolve it.
- Update the relevant documentation.

## 4. API Contract Is Law

`docs/API_CONTRACT.md` is the single source of truth for backend communication.

Frontend developers and AI assistants must not invent:
- endpoints
- HTTP methods
- request fields
- response fields
- roles
- status values
- query parameters
- business rules

If a required API does not exist:
1. Identify the requirement.
2. Discuss it with backend.
3. Update the API contract through the team process.
4. Implement the backend change.
5. Implement frontend integration.
6. Keep documentation synchronized.

Never silently work around a missing API.

## 5. V1 Roles

The API defines exactly:

```text
admin
mentor
student
```

Frontend constants may use:

```js
export const ROLES = {
  ADMIN: 'admin',
  MENTOR: 'mentor',
  STUDENT: 'student',
};
```

The values sent to the backend must remain lowercase.

## 6. V1 Modules

### Authentication
- Login
- Current authenticated user
- JWT authentication
- Protected routes
- Role-based access

There is no public registration in v1. Users are created by an admin.

### Users
Admin:
- Create user
- List/filter users
- View user
- Update user
- Deactivate user

Supported users:
- Student
- Mentor

### Batches
Admin:
- Create batch
- Update batch

Admin/mentor:
- List batches
- View batch
- View batch students

A batch has one mentor in v1.

### Attendance
Mentor/admin:
- Mark batch attendance
- View attendance
- Update attendance
- View student attendance history

Statuses:
```text
present
absent
late
```

Attendance is marked in bulk for a batch/date.

### Tasks
Mentor/admin:
- Create task
- List tasks
- View task
- Update task
- Delete/deactivate task

Student:
- View tasks belonging to their batch
- Submit task

### Submissions
Student:
- Submit task
- Add submission link
- Add optional note

Mentor/admin:
- View submissions
- Review submission
- Mark completed
- Return to pending when rejected

### Progress
Student:
- View own progress

Mentor/admin:
- View student progress

Contains:
- Attendance summary
- Task summary

### Dashboards
Student:
- attendance
- tasks
- submissions
- progress
- batch information

Mentor:
- batches
- students
- attendance
- tasks
- submissions
- at-risk students

Admin:
- users
- batches
- supported system statistics

Only implement dashboard data supported by the API contract.

## 7. Main V1 Entities

```text
User
Batch
Attendance
Task
Submission
Progress
```

Do not introduce additional domain entities without team approval.

## 8. Frontend Architecture

Use a feature-based architecture:

```text
src/
├── app/
│   ├── store/
│   │   ├── store.js
│   │   └── rootReducer.js
│   ├── router/
│   │   ├── AppRouter.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── RoleRoute.jsx
│   └── providers/
│       └── AppProviders.jsx
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── components/
│   ├── ui/
│   └── common/
├── layouts/
│   ├── AuthLayout.jsx
│   ├── DashboardLayout.jsx
│   ├── StudentLayout.jsx
│   ├── MentorLayout.jsx
│   └── AdminLayout.jsx
├── features/
│   ├── auth/
│   ├── users/
│   ├── batches/
│   ├── attendance/
│   ├── tasks/
│   ├── submissions/
│   ├── progress/
│   ├── student/
│   ├── mentor/
│   └── admin/
├── hooks/
├── services/
│   └── api/
│       └── baseApi.js
├── constants/
├── utils/
├── styles/
├── App.jsx
└── main.jsx
```

Each business domain owns its feature logic.

Example:

```text
features/tasks/
├── api/
│   └── tasksApi.js
├── components/
├── pages/
└── ...
```

## 9. State Management

Use Redux Toolkit.

### Server State — RTK Query
Use RTK Query for:
- users
- batches
- attendance
- tasks
- submissions
- progress
- API user data

RTK Query handles:
- fetching
- caching
- loading
- errors
- mutations
- refetching
- cache invalidation

Do not duplicate RTK Query server data inside Redux slices without a clear reason.

### Global Client State — Redux Toolkit
Use slices for:
- authentication/session state
- global UI state when genuinely required
- application-level preferences

Do not create Redux slices for every API resource.

### Local UI State — React State
Use React state for:
- modal open/close
- dropdowns
- selected tabs
- temporary form state
- local interactions

## 10. RTK Query Architecture

Use one shared RTK Query API:

```text
services/
└── api/
    └── baseApi.js
```

Feature APIs extend the shared base API:

```text
features/
├── auth/api/authApi.js
├── users/api/usersApi.js
├── batches/api/batchesApi.js
├── attendance/api/attendanceApi.js
├── tasks/api/tasksApi.js
├── submissions/api/submissionsApi.js
└── progress/api/progressApi.js
```

Do not create a separate API client for every feature.

## 11. API Base URL

Use environment variables:

```env
VITE_API_URL=http://localhost:5000/api
```

Production values belong in deployment configuration.

Never commit:
- API secrets
- database credentials
- JWT secrets
- passwords
- private tokens

## 12. Authentication

JWT authentication:

```text
POST /api/auth/login
GET /api/auth/me
```

Protected requests use:

```http
Authorization: Bearer <token>
```

Attach authentication centrally through the API layer.

Do not manually add auth headers inside every component.

## 13. Routing

Public:

```text
/login
```

There is no public registration route in v1.

Student:

```text
/student
/student/attendance
/student/tasks
/student/tasks/:id
/student/submissions
/student/progress
```

Mentor:

```text
/mentor
/mentor/batches
/mentor/batches/:id
/mentor/attendance
/mentor/tasks
/mentor/submissions
```

Admin:

```text
/admin
/admin/users
/admin/batches
/admin/attendance
```

Routes must be protected according to authentication and role.

## 14. Security

Frontend route protection is for UX, not the security boundary.

Backend remains responsible for:
- authentication
- authorization
- role validation
- ownership validation
- data access control

Never bypass backend authorization.

## 15. Components

### UI Components
Generic reusable components:

```text
Button
Input
Select
Modal
Card
Badge
Table
Avatar
Spinner
Skeleton
EmptyState
ErrorState
Pagination
ConfirmDialog
```

They must not contain API-specific business logic.

### Common Components

```text
PageHeader
SearchBar
StatCard
DataTable
```

### Feature Components

```text
TaskCard
AttendanceTable
SubmissionCard
SubmissionReview
BatchCard
StudentProgressCard
AtRiskStudentCard
```

## 16. Page Responsibility

Pages should compose:
- layouts
- feature components
- shared components
- API hooks
- routing concerns

Avoid large business logic inside page files.

Move complex logic into feature hooks, utilities, components, or API modules.

## 17. UI States

Every API-driven screen must handle:

```text
Loading
Success
Empty
Error
```

Never leave an API-driven screen blank while data is loading.

## 18. Forms

Forms must:
- validate input
- display validation errors
- disable submission while submitting
- prevent duplicate submissions
- display backend errors
- provide appropriate success feedback

## 19. UI / Design

Approved Figma design is the visual reference.

Follow:
- colors
- typography
- spacing
- layout
- borders
- radius
- shadows
- icons
- responsive behavior

Tailwind CSS is the primary styling solution.

Do not introduce Material UI or another large UI library without team approval.

## 20. Responsive Design

Every feature must support:
- mobile
- tablet
- desktop

Responsive behavior must be intentional.

## 21. Accessibility

Interactive elements should have:
- labels
- keyboard behavior
- focus states
- semantic HTML
- accessible error messages

Do not rely only on color to communicate status.

## 22. Team Structure

Current team:

```text
2 Frontend Developers
2 Backend Developers
```

Frontend responsibilities:
- UI
- routing
- state management
- API integration
- responsive behavior
- frontend testing

Backend responsibilities:
- API
- business logic
- authorization
- database
- validation
- backend testing

Shared architectural decisions must be communicated.

## 23. Shared Files

High-conflict files include:

```text
package.json
src/App.jsx
src/main.jsx
Redux store
RTK Query baseApi
Router
global CSS
shared UI components
configuration files
```

Do not modify shared files unnecessarily.

If a shared file must change:
- keep the change minimal
- communicate it
- avoid unrelated refactoring

## 24. Feature Development Workflow

```text
Understand requirement
        ↓
Read documentation
        ↓
Read API contract
        ↓
Inspect existing implementation
        ↓
Inspect Figma
        ↓
Identify dependencies
        ↓
Create feature branch
        ↓
Define implementation plan
        ↓
Implement UI
        ↓
Implement API integration
        ↓
Implement loading/error/empty states
        ↓
Test
        ↓
Lint
        ↓
Production build
        ↓
Review Git diff
        ↓
Commit
        ↓
Push
        ↓
Pull Request
        ↓
Code review
        ↓
Merge
```

## 25. Git Branching

Use feature branches:

```text
feature/auth-login
feature/student-dashboard
feature/student-tasks
feature/mentor-attendance
feature/admin-users
feature/batch-management
fix/auth-token
fix/task-submission
refactor/api-layer
docs/frontend-guide
```

Do not develop directly on shared `dev` unless explicitly allowed.

## 26. Commit Convention

Use conventional commits:

```text
feat(auth): implement login
feat(student): add dashboard
feat(tasks): add task list
feat(tasks): add task submission
feat(attendance): add attendance table
feat(users): add user management
fix(auth): handle expired token
fix(tasks): handle submission error
refactor(api): centralize base API
docs(frontend): update frontend guide
```

Avoid vague commits such as:
`update`, `changes`, `final`, `final2`, `new`, `test`, `abc`.

## 27. Pull Requests

Keep PRs focused.

One PR should represent one feature or logical change.

Do not mix unrelated features or refactoring into a feature PR.

## 28. Code Review

Before requesting review:
- feature complete
- API contract followed
- correct feature structure
- existing components reused
- loading/error/empty handled
- responsive UI
- authentication respected
- role access correct
- no unnecessary changes
- lint passes
- production build passes
- Git diff reviewed

## 29. Testing

At minimum test:
- happy path
- validation
- loading
- API errors
- empty states
- authorization
- mobile/tablet/desktop
- browser refresh/authentication behavior

## 30. Definition of Done

A frontend feature is complete only when:
- UI matches approved design
- API integration works
- loading state works
- error state works
- empty state works where applicable
- responsive behavior works
- authentication is respected
- role authorization is respected
- no API fields are invented
- no unnecessary duplicate components exist
- lint passes
- production build passes
- Git diff has been reviewed
- PR has been reviewed
- feature is approved for merge

## 31. AI / Claude Rules

Claude and other AI tools are development assistants, not autonomous repository owners.

The human developer remains responsible for:
- architecture
- business decisions
- code review
- security
- API correctness
- final implementation

### Claude must read context first

Before modifying code, inspect:

```text
docs/ENGINEERING_CONTEXT.md
docs/API_CONTRACT.md
docs/FRONTEND_GUIDE.md
docs/SYSTEM_DESIGN.md
docs/CODING_STANDARDS.md
```

When relevant:

```text
docs/FEATURES.md
docs/TEAM_AND_SCOPE.md
docs/GIT_WORKFLOW.md
```

### Claude must plan before coding

For non-trivial tasks identify:

```text
Feature:
Relevant files:
APIs required:
Components required:
State requirements:
Shared files affected:
Dependencies:
Potential risks:
```

Then implement.

### Claude must NOT

- rewrite the entire application
- restructure the repository without approval
- invent APIs
- invent database fields
- invent business rules
- invent roles
- modify backend during a frontend-only task
- install unnecessary dependencies
- duplicate existing components
- modify unrelated features
- remove working functionality
- bypass authentication
- bypass authorization
- silently modify API contract
- perform unrelated refactoring
- replace architecture without approval

### AI API Rule

If a required API does not exist:

1. Report the missing API.
2. Identify the required frontend behavior.
3. Ask whether backend should add it.
4. Wait for the API contract to be updated.

Never invent an endpoint.

### AI Refactoring Rule

Do not perform opportunistic refactoring.

If unrelated technical debt is found:
- mention it
- document it
- do not automatically fix it unless requested

### AI Dependency Rule

Do not install a package unless:
1. It is required.
2. Existing dependencies cannot reasonably solve the problem.
3. It fits the architecture.
4. The developer/team approves it when appropriate.

Before installing:

```text
Package:
Purpose:
Why existing dependencies are insufficient:
Impact:
```

### AI File Safety

Avoid modifying:

```text
.env
.env.local
.env.production
secrets
credentials
deployment secrets
private keys
```

Never expose secrets in source code, commits, PRs, logs, or documentation.

### AI Output Review

AI-generated code must be reviewed like human-written code.

Verify:
- correctness
- architecture
- security
- API contract
- performance
- maintainability
- edge cases

"Claude generated it" is never a reason to trust it blindly.

## 32. No Blind Copy-Paste

Developers should understand:
- what AI-generated code does
- why it exists
- how it interacts with the application
- assumptions it makes
- APIs it depends on

AI accelerates development; it does not replace engineering judgment.

## 33. Error Handling

Never silently swallow errors.

Bad:

```js
try {
  ...
} catch {
}
```

Errors should be handled intentionally.

Users receive useful feedback; technical details remain appropriate for logs/debugging.

## 34. Performance

Do not optimize prematurely.

Prioritize:

1. Correctness
2. Maintainability
3. User experience
4. Performance

Optimize when there is a measurable problem or clear architectural reason.

## 35. No Overengineering

Prefer simple solutions.

Create abstractions when:
- logic is repeated
- responsibility is clear
- reuse is expected
- complexity is reduced

Avoid unnecessary:
- GenericManager
- UniversalHandler
- SuperService
- MegaComponent
- GodStore

## 36. Documentation Rule

When architecture changes, update the relevant documentation.

API change:
`API_CONTRACT.md`

Frontend architecture change:
`FRONTEND_GUIDE.md`

System architecture change:
`SYSTEM_DESIGN.md`

Git workflow change:
`GIT_WORKFLOW.md`

Do not allow documentation and implementation to drift apart.

## 37. Feature Boundary Rule

A feature should own its business logic.

Example:

```text
features/tasks/
```

owns:
- task API
- task components
- task pages
- task-specific logic

Shared logic belongs in shared locations only when it is genuinely shared.

## 38. Dependency Direction

Prefer:

```text
Pages
  ↓
Feature Components
  ↓
Feature Hooks / Logic
  ↓
RTK Query / Redux
  ↓
API Layer
  ↓
Backend
```

Shared UI components must not depend on business features.

For example, `Button` should not import `tasksApi`, while `TaskPage` may use `useGetTasksQuery()`.

## 39. Three State Layers

```text
┌─────────────────────────────┐
│ React Local State           │
│ temporary UI state          │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│ Redux Toolkit               │
│ global/client state         │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│ RTK Query                   │
│ server/API state            │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│ Backend API                 │
└─────────────────────────────┘
```

## 40. Feature Example — Student Tasks

Read:

```text
API_CONTRACT.md
FRONTEND_GUIDE.md
ENGINEERING_CONTEXT.md
```

Inspect:

```text
features/tasks/
features/student/
components/
layouts/
router/
```

Required APIs:

```text
GET /api/tasks
GET /api/tasks/:id
POST /api/tasks/:id/submit
```

Possible structure:

```text
features/tasks/
├── api/
│   └── tasksApi.js
├── components/
│   ├── TaskCard.jsx
│   └── TaskStatusBadge.jsx
├── pages/
│   ├── TaskListPage.jsx
│   └── TaskDetailsPage.jsx
└── ...
```

Handle:

```text
loading
success
empty
error
submission
```

Then test, lint, build, review, commit, push, and create PR.

## 41. Feature Checklist

Before starting:

```text
[ ] Requirement understood
[ ] API contract checked
[ ] Figma checked
[ ] Existing implementation checked
[ ] Dependencies identified
[ ] Branch created
```

During implementation:

```text
[ ] Feature structure followed
[ ] Shared components reused
[ ] RTK Query used for server state
[ ] Redux used only where required
[ ] API contract respected
[ ] Loading handled
[ ] Error handled
[ ] Empty state handled
[ ] Responsive behavior handled
[ ] Role restrictions handled
```

Before PR:

```text
[ ] Manual testing complete
[ ] npm run lint passes
[ ] npm run build passes
[ ] Git diff reviewed
[ ] No secrets committed
[ ] No unrelated changes
[ ] Commit message is clear
[ ] PR description is clear
```

## 42. Team Communication

Communicate when:
- changing shared architecture
- changing API contracts
- modifying shared components
- adding dependencies
- changing routing
- changing authentication
- changing global state
- changing design system
- touching another developer's feature

Do not surprise teammates with large architectural changes.

## 43. Code Ownership

Feature ownership means responsibility, not exclusive control.

Another developer may review or modify your feature when necessary.

Write code another team member can understand and maintain.

## 44. Final Engineering Principle

The goal is not to write the most code.

Build a system that is:
- correct
- maintainable
- understandable
- testable
- secure
- scalable enough for actual requirements
- easy for another developer to continue

Prefer:

```text
simple + consistent + documented
```

over:

```text
complex + clever + over-engineered
```

## 45. Final Rule

When uncertain:

```text
STOP
  ↓
READ DOCUMENTATION
  ↓
CHECK API CONTRACT
  ↓
INSPECT EXISTING CODE
  ↓
CHECK DESIGN
  ↓
ASK TEAM IF STILL UNCLEAR
  ↓
IMPLEMENT
```

Never guess when the decision affects:
- API behavior
- database behavior
- authentication
- authorization
- architecture
- business rules
- shared state
- team workflow

---

# END OF ENGINEERING CONTEXT

