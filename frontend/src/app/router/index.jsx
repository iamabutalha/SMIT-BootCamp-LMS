import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';
import { ROLES } from '../../constants/roles';
import { ROUTES } from '../../constants/routes';

// Layouts
import StudentLayout from '../../layouts/StudentLayout';
import MentorLayout from '../../layouts/MentorLayout';
import AdminLayout from '../../layouts/AdminLayout';
import DashboardLayout from '../../layouts/DashboardLayout';

// Auth Feature Pages
import Login from '../../features/auth/pages/Login';
import Signup from '../../features/auth/pages/Signup';

// General Pages
import UnauthorizedPage from '../../pages/UnauthorizedPage';
import NotFoundPage from '../../pages/NotFoundPage';
import RootRedirect from '../../pages/RootRedirect';
import FoundationShowcasePage from '../../pages/FoundationShowcasePage';
import ComponentShowcase from '../../pages/ComponentShowcase';

// Structural Demo Placeholders for domain validation
function StudentPlaceholder() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-slate-900">Student Portal Home</h1>
      <p className="text-slate-600 text-sm mt-1">
        This is the foundation placeholder for student domain features (Faizan).
      </p>
    </div>
  );
}

function MentorPlaceholder() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-slate-900">Mentor Portal Home</h1>
      <p className="text-slate-600 text-sm mt-1">
        This is the foundation placeholder for mentor domain features (Muzamil).
      </p>
    </div>
  );
}

function AdminPlaceholder() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-slate-900">Admin Portal Home</h1>
      <p className="text-slate-600 text-sm mt-1">
        This is the foundation placeholder for admin domain features (Muzamil).
      </p>
    </div>
  );
}

export function AppRouter() {
  return (
    <Routes>
      {/* Root Smart Redirect */}
      <Route path={ROUTES.ROOT} element={<RootRedirect />} />

      {/* Public Auth Routes */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />

      {/* Foundation Showcase Route & Component Library Showcase */}
      <Route element={<DashboardLayout />}>
        <Route path="/showcase" element={<FoundationShowcasePage />} />
        <Route path="/components" element={<ComponentShowcase />} />
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
        <Route path={ROUTES.ADMIN.ROOT} element={<AdminPlaceholder />} />
      </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
