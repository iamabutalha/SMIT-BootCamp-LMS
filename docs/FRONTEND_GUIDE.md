# Bootcamp LMS — Frontend Engineering Guide

## 1. Purpose

This document defines the architecture, coding standards, state management,
API integration, routing, component organization, and development practices
for the Bootcamp LMS frontend.

The frontend is built with:

- React
- Vite
- JavaScript / JSX
- Tailwind CSS
- Redux Toolkit
- RTK Query
- React Router

The frontend must follow the API contract defined in:

`docs/API_CONTRACT.md`

The API contract is the single source of truth for backend communication.

---

# 2. Core Engineering Principles

The frontend must follow these principles:

1. Feature-based architecture
2. Reusable components
3. Separation of UI and business logic
4. Centralized API communication
5. Server state managed by RTK Query
6. Client/global state managed by Redux Toolkit
7. Local UI state should remain local
8. No duplicated API logic
9. No invented API endpoints
10. No invented response fields
11. No business rules inside presentational components
12. Responsive design by default
13. Accessibility should be considered for all interactive elements
14. Every feature must handle loading, success, empty, and error states
15. Keep pull requests small and reviewable

---

# 3. Technology Stack

## Core

React + Vite

## Routing

React Router

## State Management

Redux Toolkit

## Server State

RTK Query

## Styling

Tailwind CSS

## API

RTK Query / fetchBaseQuery

## Code Quality

ESLint

Prettier

---

# 4. Folder Structure

Use a feature-based architecture.

```text
frontend/
│
├── public/
│   ├── favicon.ico
│   └── assets/
│
├── src/
│
│   ├── app/
│   │   ├── store/
│   │   │   ├── store.js
│   │   │   └── rootReducer.js
│   │   │
│   │   ├── router/
│   │   │   ├── AppRouter.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── RoleRoute.jsx
│   │   │
│   │   └── providers/
│   │       └── AppProviders.jsx
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Avatar.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── ConfirmDialog.jsx
│   │   │
│   │   └── common/
│   │       ├── PageHeader.jsx
│   │       ├── SearchBar.jsx
│   │       ├── StatCard.jsx
│   │       └── DataTable.jsx
│   │
│   ├── layouts/
│   │   ├── AuthLayout.jsx
│   │   ├── DashboardLayout.jsx
│   │   ├── StudentLayout.jsx
│   │   ├── MentorLayout.jsx
│   │   └── AdminLayout.jsx
│   │
│   ├── features/
│   │
│   │   ├── auth/
│   │   │   ├── api/
│   │   │   │   └── authApi.js
│   │   │   ├── components/
│   │   │   │   └── LoginForm.jsx
│   │   │   ├── pages/
│   │   │   │   └── LoginPage.jsx
│   │   │   ├── authSlice.js
│   │   │   └── authSelectors.js
│   │
│   │   ├── users/
│   │   │   ├── api/
│   │   │   │   └── usersApi.js
│   │   │   ├── components/
│   │   │   └── pages/
│   │
│   │   ├── batches/
│   │   │   ├── api/
│   │   │   │   └── batchesApi.js
│   │   │   ├── components/
│   │   │   └── pages/
│   │
│   │   ├── attendance/
│   │   │   ├── api/
│   │   │   │   └── attendanceApi.js
│   │   │   ├── components/
│   │   │   └── pages/
│   │
│   │   ├── tasks/
│   │   │   ├── api/
│   │   │   │   └── tasksApi.js
│   │   │   ├── components/
│   │   │   └── pages/
│   │
│   │   ├── submissions/
│   │   │   ├── api/
│   │   │   │   └── submissionsApi.js
│   │   │   ├── components/
│   │   │   └── pages/
│   │
│   │   ├── progress/
│   │   │   ├── api/
│   │   │   │   └── progressApi.js
│   │   │   ├── components/
│   │   │   └── pages/
│   │
│   │   ├── student/
│   │   │   ├── components/
│   │   │   └── pages/
│   │   │       ├── StudentDashboard.jsx
│   │   │       ├── StudentBatch.jsx
│   │   │       ├── StudentAttendance.jsx
│   │   │       ├── StudentTasks.jsx
│   │   │       ├── StudentTaskDetails.jsx
│   │   │       ├── StudentSubmissions.jsx
│   │   │       └── StudentProgress.jsx
│   │
│   │   ├── mentor/
│   │   │   ├── components/
│   │   │   └── pages/
│   │
│   │   └── admin/
│   │       ├── components/
│   │       └── pages/
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── usePermissions.js
│   │
│   ├── services/
│   │   └── api/
│   │       └── baseApi.js
│   │
│   ├── constants/
│   │   ├── roles.js
│   │   ├── routes.js
│   │   └── status.js
│   │
│   ├── utils/
│   │   ├── formatDate.js
│   │   ├── formatPercentage.js
│   │   └── errorHandler.js
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .env.example
├── .gitignore
├── eslint.config.js
├── package.json
├── vite.config.js
└── README.md