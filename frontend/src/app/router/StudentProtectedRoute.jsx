import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';
import { ROLES } from '../../constants/roles';
import PageLoader from '../../components/common/PageLoader';

/**
 * StudentProtectedRoute Guard
 * Strictly enforces that only authenticated STUDENT users can access /student/* routes.
 * Unauthenticated users are redirected to /student/login.
 * Authenticated Non-Student users (e.g. Admin) are redirected to their respective dashboard.
 */
export function StudentProtectedRoute({ children }) {
  const { isAuthenticated, role, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <PageLoader message="Verifying student session..." />;
  }

  if (!isAuthenticated) {
    const fullPath = location.pathname + location.search;
    return (
      <Navigate
        to={`${ROUTES.STUDENT.LOGIN}?redirect=${encodeURIComponent(fullPath)}`}
        state={{ from: location }}
        replace
      />
    );
  }

  const userRole = role ? String(role).toUpperCase() : null;

  if (userRole !== ROLES.STUDENT) {
    if (userRole === ROLES.ADMIN) {
      return <Navigate to={ROUTES.ADMIN.ROOT} replace />;
    }
    if (userRole === ROLES.MENTOR) {
      return <Navigate to={ROUTES.MENTOR.ROOT} replace />;
    }
    return <Navigate to={ROUTES.ADMIN.ROOT} replace />;
  }

  return children ? children : <Outlet />;
}

export default StudentProtectedRoute;
