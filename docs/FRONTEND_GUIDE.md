# Bootcamp LMS - Frontend Guide

## 1. Folder Structure
Our frontend is powered by React and Vite, utilizing Tailwind CSS for styling. 

```text
/frontend
├── /public           # Static assets (favicons, manifest)
├── /src
│   ├── /assets       # Images, global stylesheets
│   ├── /components   # Reusable UI elements (Buttons, Cards, Modals)
│   ├── /context      # React Context providers (AuthContext, ThemeContext)
│   ├── /hooks        # Custom hooks (useAuth, useFetch)
│   ├── /pages        # Top-level route components (Dashboard, Login)
│   ├── /services     # API integration layer (Axios instances, endpoints)
│   ├── App.jsx       # Main application component and routing setup
│   └── main.jsx      # Vite entry point
```

## 2. API Layer & State Management
*   **Centralized API Calls:** Do not write `fetch` or `axios` logic directly inside UI components. All external calls must be abstracted into the `/services` folder. Aleks and Harshal will establish the initial Axios interceptors to automatically attach JWTs to outbound requests and handle 401 unauthenticated redirects globally.
*   **State:** Use React Context for global state (like user session data and role). Keep component state local where possible.

## 3. Role-Based Routing
Since the LMS UI changes drastically based on the user, we utilize a `ProtectedRoute` wrapper component in `App.jsx`.
*   **Public:** `/login`, `/register`
*   **Student:** `/dashboard`, `/tasks/:id` (Wrapped in `<ProtectedRoute allowedRoles={['STUDENT']}>`)
*   **Mentor/Admin:** `/mentor/attendance`, `/admin/cohorts` (Wrapped in `<ProtectedRoute allowedRoles={['ADMIN', 'MENTOR']}>`)

## 4. Styling Guidelines
*   **Tailwind First:** Rely entirely on Tailwind utility classes for layout, spacing, and typography.
*   **Component Libraries:** Avoid bringing in heavy component libraries (like Material UI) to keep the bundle small. Build custom UI elements using standard HTML/Tailwind, extracting them into `/components` for reuse.
