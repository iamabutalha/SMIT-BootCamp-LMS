import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';
import { ROLES } from '../../constants/roles';
import PageLoader from '../../components/common/PageLoader';

/**
 * AdminProtectedRoute Guard
 * Strictly enforces that only authenticated ADMIN users can access /admin/* routes.
 * Unauthenticated users are redirected to /admin/login.
 * Authenticated Non-Admin users (e.g. Students) are redirected to their respective dashboard.
 */
export function AdminProtectedRoute({ children }) {
  const { isAuthenticated, role, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <PageLoader message="Verifying admin session..." />;
  }

  if (!isAuthenticated) {
    const fullPath = location.pathname + location.search;
    return (
      <Navigate
        to={`${ROUTES.ADMIN.LOGIN}?redirect=${encodeURIComponent(fullPath)}`}
        state={{ from: location }}
        replace
      />
    );
  }

  const userRole = role ? String(role).toUpperCase() : null;

  if (userRole !== ROLES.ADMIN) {
    if (userRole === ROLES.STUDENT) {
      return <Navigate to={ROUTES.STUDENT.ROOT} replace />;
    }
    if (userRole === ROLES.MENTOR) {
      return <Navigate to={ROUTES.MENTOR.ROOT} replace />;
    }
    return <Navigate to={ROUTES.STUDENT.ROOT} replace />;
  }

  return children ? children : <Outlet />;
}

export default AdminProtectedRoute;
