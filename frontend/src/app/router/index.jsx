import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import RoleRoute from './RoleRoute';
import { ROLES } from '../../constants/roles';
import { ROUTES } from '../../constants/routes';

// Layouts
import StudentLayout from '../../layouts/StudentLayout';
import MentorLayout from '../../layouts/MentorLayout';
import AdminLayout from '../../layouts/AdminLayout';

// Auth Feature Pages
import Login from '../../features/auth/pages/Login';
import Signup from '../../features/auth/pages/Signup';

// Admin Feature Pages
import DashboardPage from '../../features/dashboard/pages/DashboardPage';
import StudentsPage from '../../features/users/pages/StudentsPage';
import StudentDetailsPage from '../../features/users/pages/StudentDetailsPage';
import AttendancePage from '../../features/attendance/pages/AttendancePage';
import AttendanceHistoryPage from '../../features/attendance/pages/AttendanceHistoryPage';
import CohortsPage from '../../features/batches/pages/CohortsPage';
import TeamDetailsPage from '../../features/batches/pages/TeamDetailsPage';
import TasksPage from '../../features/tasks/pages/TasksPage';
import ProfilePage from '../../features/auth/pages/ProfilePage';
import ProgressPage from '../../features/progress/pages/ProgressPage';

// General Pages
import UnauthorizedPage from '../../pages/UnauthorizedPage';
import NotFoundPage from '../../pages/NotFoundPage';
import RootRedirect from '../../pages/RootRedirect';

// Structural Demo Placeholders for other role domains
function StudentPlaceholder() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-slate-900">Student Portal Home</h1>
      <p className="text-slate-600 text-sm mt-1">
        This is the foundation placeholder for student domain features.
      </p>
    </div>
  );
}

function MentorPlaceholder() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-slate-900">Mentor Portal Home</h1>
      <p className="text-slate-600 text-sm mt-1">
        This is the foundation placeholder for mentor domain features.
      </p>
    </div>
  );
}

export function AppRouter() {
  return (
    <Routes>
      {/* Root Smart Redirect & Common Top-Level Section Aliases */}
      <Route path={ROUTES.ROOT} element={<RootRedirect />} />
      <Route path={ROUTES.DASHBOARD} element={<RootRedirect />} />
      <Route path="/students" element={<RootRedirect section="students" />} />
      <Route path="/attendance" element={<RootRedirect section="attendance" />} />
      <Route path="/assignments" element={<RootRedirect section="assignments" />} />
      <Route path="/tasks" element={<RootRedirect section="tasks" />} />
      <Route path="/cohorts" element={<RootRedirect section="cohorts" />} />
      <Route path="/progress" element={<RootRedirect section="progress" />} />
      <Route path="/profile" element={<RootRedirect section="profile" />} />

      {/* Public Auth Routes (Redirect logged-in users away) */}
      <Route element={<PublicOnlyRoute />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />

      {/* Protected Admin Domain */}
      <Route
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.ADMIN.ROOT} element={<DashboardPage />} />
        <Route path="/admin/progress" element={<ProgressPage />} />
        <Route path={ROUTES.ADMIN.STUDENTS} element={<StudentsPage />} />
        <Route path="/admin/students/:studentId" element={<StudentDetailsPage />} />
        <Route path="/admin/users/:studentId" element={<StudentDetailsPage />} />
        <Route path="/students/:studentId" element={<StudentDetailsPage />} />
        <Route path={ROUTES.ADMIN.USERS} element={<StudentsPage />} />
        <Route path={ROUTES.ADMIN.ATTENDANCE} element={<AttendancePage />} />
        <Route path="/admin/attendance/history" element={<AttendanceHistoryPage />} />
        <Route path={ROUTES.ADMIN.COHORTS} element={<CohortsPage />} />
        <Route path="/admin/teams" element={<CohortsPage />} />
        <Route path="/admin/teams/:teamId" element={<TeamDetailsPage />} />
        <Route path="/admin/cohorts/:teamId" element={<TeamDetailsPage />} />
        <Route path="/teams/:teamId" element={<TeamDetailsPage />} />
        <Route path="/admin/courses" element={<CohortsPage />} />
        <Route path={ROUTES.ADMIN.TASKS} element={<TasksPage />} />
        <Route path={ROUTES.ADMIN.PROFILE} element={<ProfilePage />} />
      </Route>

      {/* Protected Student Domain */}
      <Route
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={[ROLES.STUDENT]}>
              <StudentLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.STUDENT.ROOT} element={<StudentPlaceholder />} />
      </Route>

      {/* Protected Mentor Domain */}
      <Route
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={[ROLES.MENTOR, ROLES.ADMIN]}>
              <MentorLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.MENTOR.ROOT} element={<MentorPlaceholder />} />
      </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
