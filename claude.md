# Bootcamp LMS — Frontend AI Context

## 1. Project Overview

This repository contains the frontend application for the **Bootcamp LMS (Learning Management System)**.

The LMS is a role-based educational platform where users can interact with courses, lessons, assignments, quizzes, progress tracking, profiles, notifications, and administrative features.

### Target Architecture

* Frontend: React
* Build Tool: Vite
* Styling: Tailwind CSS
* State Management: Redux Toolkit (RTK)
* Routing: React Router
* Backend: Node.js + Express
* Database: MongoDB
* Authentication: JWT-based authentication
* API Communication: REST API
* Version Control: Git + GitHub

The frontend must communicate with the backend through documented API contracts.

---

# 2. IMPORTANT AI DEVELOPMENT RULES

You are working inside an existing team project.

Your job is to implement the requested feature safely without breaking existing functionality.

## NEVER do these things without explicit permission

* Do not redesign the entire application.
* Do not rewrite the project architecture.
* Do not replace Redux Toolkit with another state-management solution.
* Do not replace React Router.
* Do not replace Tailwind CSS.
* Do not install new packages unless necessary and explicitly approved.
* Do not modify unrelated modules.
* Do not rename large numbers of files.
* Do not delete existing working functionality.
* Do not create duplicate components when reusable components already exist.
* Do not invent backend API endpoints.
* Do not invent API response structures.
* Do not invent authentication behavior.
* Do not change environment variables without permission.
* Do not modify another developer's feature unless required for integration.
* Do not make large refactors while implementing a small feature.
* Do not generate mock APIs when real APIs already exist.

### Core Principle

> Make the smallest safe change required to implement the requested feature.

---

# 3. BEFORE WRITING CODE

Before implementing any feature, follow this process.

### Step 1 — Inspect the project

Inspect:

* package.json
* src/
* existing routes
* Redux store
* API services
* reusable components
* layouts
* existing pages
* feature folders
* environment configuration
* relevant documentation

### Step 2 — Understand existing patterns

Determine:

* How components are structured
* How Redux slices are structured
* How API requests are handled
* How errors are handled
* How loading states are handled
* How authentication works
* How protected routes work
* How forms are validated
* How Tailwind classes are organized

Follow existing patterns instead of creating new ones.

### Step 3 — Create an implementation plan

Before making major changes, explain:

1. What needs to be implemented
2. Which files need to change
3. Which files need to be created
4. Which existing components can be reused
5. Which APIs are required
6. Which Redux state is required
7. Potential risks or dependencies

Do not modify unrelated files.

---

# 4. FEATURE-SCOPED DEVELOPMENT

Every task should belong to a specific feature/module.

Examples:

```text
feature/auth-login
feature/auth-register
feature/student-dashboard
feature/course-list
feature/course-details
feature/course-learning
feature/assignments
feature/quizzes
feature/student-profile
feature/instructor-dashboard
feature/admin-dashboard
```

When asked to implement:

```text
Student Dashboard
```

Only work on the Student Dashboard and its required dependencies.

Do not automatically implement:

* Instructor Dashboard
* Admin Dashboard
* Quiz Management
* Course Management
* Notifications

unless explicitly requested.

---

# 5. PROJECT MODULES

The LMS contains the following major modules.

## Authentication

```text
Login
Register
Logout
Forgot Password
Reset Password
Email Verification
Session Persistence
Protected Routes
Role-Based Access
```

## Student

```text
Student Dashboard
Course Discovery
Course Details
Enrollment
Learning Interface
Lessons
Video Player
Progress Tracking
Assignments
Quizzes
Certificates
Profile
Notifications
Settings
```

## Instructor

```text
Instructor Dashboard
Course Management
Course Creation
Course Editing
Lesson Management
Assignment Management
Quiz Management
Student Management
Grading
Analytics
```

## Admin

```text
Admin Dashboard
User Management
Instructor Management
Course Management
Course Approval
Reports
Analytics
System Settings
```

---

# 6. ROLE-BASED ACCESS CONTROL

The application supports role-based access.

Possible roles include:

```text
STUDENT
INSTRUCTOR
ADMIN
```

Never assume a user's permissions.

Always use the project's existing authentication and authorization implementation.

Example conceptual routing:

```text
/student/*
    STUDENT

/instructor/*
    INSTRUCTOR

/admin/*
    ADMIN
```

If the project already has a different routing structure, follow the existing implementation.

---

# 7. FOLDER STRUCTURE

Prefer feature-oriented organization.

Example:

```text
src/
│
├── app/
│   ├── store.js
│   └── router.jsx
│
├── components/
│   └── ui/
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Modal.jsx
│       ├── Card.jsx
│       ├── Badge.jsx
│       ├── Loader.jsx
│       └── Pagination.jsx
│
├── layouts/
│   ├── AuthLayout.jsx
│   ├── StudentLayout.jsx
│   ├── InstructorLayout.jsx
│   └── AdminLayout.jsx
│
├── features/
│   ├── auth/
│   ├── courses/
│   ├── students/
│   ├── assignments/
│   ├── quizzes/
│   ├── progress/
│   └── notifications/
│
├── pages/
│
├── services/
│   ├── api.js
│   └── ...
│
├── hooks/
│
├── utils/
│
├── constants/
│
└── assets/
```

IMPORTANT:

If the repository already has a folder structure, DO NOT restructure it just to match this example.

The existing project structure has priority.

---

# 8. COMPONENT REUSE

Always search for an existing component before creating a new one.

For example, before creating:

```text
CustomButton.jsx
```

check whether:

```text
Button.jsx
```

already exists.

Prefer:

```text
<Button />
<Input />
<Modal />
<Card />
<Badge />
<Loader />
```

over creating duplicate components.

Reusable components should remain generic.

Feature-specific components belong inside their feature.

Example:

```text
components/ui/Button.jsx

features/courses/components/CourseCard.jsx
features/courses/components/CourseFilters.jsx
```

---

# 9. REDUX TOOLKIT RULES

Redux Toolkit is the project's global state-management solution.

Use Redux for shared application state such as:

```text
auth
user
courses
enrollment
progress
notifications
```

Do NOT put every piece of UI state into Redux.

Local UI state should normally use:

```js
useState
```

Examples:

```text
modal open/close
sidebar open/close
active tab
input value
temporary UI state
```

Follow the existing Redux architecture.

Do not create a new Redux pattern if one already exists.

---

# 10. API DEVELOPMENT RULES

The backend API is the source of truth.

Never invent an endpoint.

Before using an API:

1. Search the existing API service.
2. Check frontend documentation.
3. Check backend documentation if available.
4. Confirm the endpoint and response structure.

Example:

```text
GET /api/courses
POST /api/courses
GET /api/courses/:id
```

Do not assume these endpoints exist unless confirmed.

If an API is missing, clearly state:

```text
Required API:
METHOD /endpoint
Expected request:
Expected response:
```

Do not silently create fake backend behavior.

---

# 11. API RESPONSE HANDLING

Always handle:

```text
Loading
Success
Empty
Error
Unauthorized
Forbidden
Network failure
```

Example conceptual state:

```js
{
    data: null,
    loading: false,
    error: null
}
```

Do not assume successful API responses.

The UI must handle empty data gracefully.

Example:

```text
No courses found.
No assignments available.
No notifications yet.
```

---

# 12. AUTHENTICATION

Authentication is security-sensitive.

Never expose:

* passwords
* secrets
* private API keys
* backend credentials
* database credentials

Never hardcode secrets into React components.

Use environment variables where required.

Example:

```text
VITE_API_URL
```

Do not commit:

```text
.env
```

unless the team explicitly requires it.

---

# 13. FORMS

For forms:

* Reuse existing form components.
* Follow existing validation patterns.
* Show useful validation errors.
* Disable submit buttons while submitting.
* Handle backend validation errors.
* Prevent duplicate submissions.

Example:

```text
Loading
→ Disable Submit

Success
→ Show success state / navigate

Error
→ Display useful error message
```

Do not silently swallow errors.

---

# 14. UI / DESIGN SYSTEM

The LMS should maintain a consistent visual system.

Follow the existing:

* colors
* typography
* spacing
* border radius
* shadows
* buttons
* cards
* forms
* navigation
* responsive behavior

The design from Figma/Stitch is the visual source of truth when available.

Do not introduce random colors or visual styles.

Do not redesign existing screens unless explicitly requested.

---

# 15. RESPONSIVE DESIGN

Every user-facing page should work on:

```text
Mobile
Tablet
Desktop
Large Desktop
```

Use Tailwind responsive utilities.

Consider:

```text
sm
md
lg
xl
2xl
```

Do not only design for desktop.

For dashboards, tables, sidebars, and course-learning screens, explicitly consider mobile behavior.

---

# 16. ACCESSIBILITY

When implementing UI:

* Use semantic HTML.
* Use accessible labels.
* Ensure buttons are keyboard accessible.
* Do not rely only on color to communicate meaning.
* Provide alt text for meaningful images.
* Use proper heading hierarchy.
* Ensure form inputs have labels.
* Maintain visible focus states.

Avoid:

```html
<div onClick={...}>
```

when a semantic:

```html
<button>
```

is appropriate.

---

# 17. LOADING / ERROR / EMPTY STATES

Every API-driven component should consider:

### Loading

```text
Skeleton
Spinner
Loading placeholder
```

### Error

```text
Something went wrong.
Try again.
```

### Empty

```text
No courses found.
No assignments available.
```

### Success

Display the actual data.

Never leave the user with a blank screen.

---

# 18. CODE QUALITY

Write code that a human teammate can understand.

Prefer:

```js
const enrolledCourses = ...
```

instead of:

```js
const x = ...
```

Use meaningful names.

Keep components focused.

Avoid extremely large components.

If a component becomes difficult to understand, split it into logical components.

Do not over-engineer simple features.

---

# 19. COMMENTS

Do not add unnecessary comments.

Bad:

```js
// Set loading to true
setLoading(true);
```

Useful:

```js
// Preserve the previous lesson while the next lesson is loading
```

Only comment when the reasoning is not obvious from the code.

---

# 20. ERROR HANDLING

Never do:

```js
catch (error) {
    console.log(error);
}
```

without handling the user-facing state.

Use the project's existing error-handling mechanism.

Avoid exposing internal backend errors directly to users.

---

# 21. GIT / TEAM COLLABORATION

The team uses feature branches.

Never directly push feature work to `main`.

Preferred workflow:

```bash
git checkout development
git pull origin development

git checkout -b feature/<feature-name>
```

After implementation:

```bash
git status
git diff

npm run lint
npm run build

git add .
git commit -m "feat(scope): description"

git push origin feature/<feature-name>
```

Then create a Pull Request into the team's development branch.

---

# 22. COMMIT CONVENTION

Prefer Conventional Commits.

Examples:

```text
feat(auth): add login page
feat(student): implement student dashboard
feat(course): add course details page
fix(auth): handle expired session
fix(course): resolve course loading state
refactor(ui): improve reusable button
style(dashboard): adjust responsive layout
docs(frontend): update API documentation
```

Keep commits focused.

Avoid:

```text
final changes
update
fixed stuff
changes
```

---

# 23. PULL REQUEST RULES

A PR should normally represent one feature or focused change.

Example:

```text
feat(student): implement student dashboard
```

PR should include:

```text
Summary
Features
Technical Changes
Testing
Screenshots
Known Issues
Related Issue
```

Avoid giant PRs containing unrelated features.

---

# 24. AI-SPECIFIC RULES

You are an AI coding assistant working with human developers.

Your code will be reviewed by the team.

Therefore:

### Before coding

Inspect the relevant project files.

### During coding

Stay within the requested scope.

### After coding

Report:

```text
Files created
Files modified
Files deleted
Dependencies added
APIs used
Redux changes
Potential risks
Testing performed
```

If you are unsure about an architecture decision, STOP and ask instead of guessing.

---

# 25. DO NOT HIDE CHANGES

Never silently perform large refactors.

If a change requires modifying an unrelated file, explain why.

Example:

```text
The requested feature requires modifying X because Y.
```

Do not make unrelated improvements in the same task.

---

# 26. WHEN REQUIREMENTS ARE UNCLEAR

If the requirement is ambiguous:

1. Inspect existing implementation.
2. Check documentation.
3. Check related components.
4. If still ambiguous, ask a concise question.

Do not invent business logic.

---

# 27. TESTING REQUIREMENTS

Before considering a feature complete, test:

```text
Happy path
Loading state
Empty state
Error state
Unauthorized state
Responsive layout
Form validation
Navigation
API failure
Refresh behavior
```

Run:

```bash
npm run lint
npm run build
```

If tests exist:

```bash
npm test
```

Do not claim something was tested if it was not actually tested.

---

# 28. PERFORMANCE

Avoid unnecessary:

* API requests
* Redux state updates
* component re-renders
* large bundle imports
* duplicated data fetching

Use existing project patterns for:

```text
memoization
lazy loading
pagination
debouncing
caching
```

Do not optimize prematurely.

Measure or identify a real problem before introducing complex optimization.

---

# 29. SECURITY

Frontend code must never contain:

```text
MongoDB credentials
JWT secrets
SMTP passwords
Private API keys
Cloudinary private credentials
Database connection strings
```

Never commit sensitive credentials.

Remember:

> Anything exposed in frontend JavaScript should be considered public.

---

# 30. FEATURE IMPLEMENTATION TEMPLATE

When given a feature, follow this workflow.

## Phase A — Analyze

```text
Feature:
<feature name>

Goal:
<what the feature should accomplish>

Related modules:
<modules>

Existing components:
<components>

Existing APIs:
<APIs>

Existing Redux:
<state>

Files likely affected:
<files>
```

## Phase B — Plan

Explain:

```text
1. Component structure
2. State management
3. API integration
4. Routing
5. Loading/error states
6. Responsive behavior
```

## Phase C — Implement

Implement only the requested feature.

## Phase D — Verify

Check:

```text
Lint
Build
Runtime
Responsive UI
API behavior
Error handling
```

## Phase E — Report

Return:

```text
Implemented:
...

Files changed:
...

APIs used:
...

Redux changes:
...

Testing:
...

Potential issues:
...
```

---

# 31. EXAMPLE FEATURE

If asked:

```text
Implement Student Course List
```

The expected process is:

```text
1. Inspect existing course components.
2. Inspect routing.
3. Inspect Redux course state.
4. Inspect API service.
5. Confirm API response.
6. Reuse CourseCard if available.
7. Build CourseList.
8. Add loading state.
9. Add empty state.
10. Add error state.
11. Add search/filter if required.
12. Make responsive.
13. Test.
14. Report changed files.
```

Do NOT automatically implement:

```text
Course Details
Enrollment
Assignments
Quizzes
Instructor Courses
Admin Courses
```

unless requested.

---

# 32. PRIORITY ORDER

When making implementation decisions, use this priority:

```text
1. Existing project architecture
2. Team documentation
3. Backend API contract
4. Figma/Stitch design
5. Feature requirements
6. Existing reusable components
7. AI suggestions
```

AI suggestions are never more important than the project's existing architecture.

---

# 33. DEFINITION OF DONE

A feature is considered complete only when:

* [ ] Requirement implemented
* [ ] Existing architecture followed
* [ ] Existing components reused where possible
* [ ] API integrated correctly
* [ ] Redux implemented correctly if needed
* [ ] Loading state implemented
* [ ] Error state implemented
* [ ] Empty state implemented
* [ ] Responsive UI implemented
* [ ] Accessibility considered
* [ ] No unrelated files changed
* [ ] No secrets exposed
* [ ] Lint passes
* [ ] Build passes
* [ ] Feature manually tested
* [ ] Git diff reviewed
* [ ] PR description prepared

---

# 34. FINAL AI INSTRUCTION

You are not the owner of the entire LMS.

You are an implementation assistant working for the development team.

Your responsibility is to produce clean, maintainable, scoped changes.

Always prefer:

```text
Small change
+
Existing architecture
+
Reusable components
+
Real API contracts
+
Clear state management
+
Tested implementation
+
Reviewable PR
```

over:

```text
Large AI-generated rewrite
```

When uncertain, do not guess.

Inspect first.

Plan second.

Implement third.

Test fourth.

Report last.
