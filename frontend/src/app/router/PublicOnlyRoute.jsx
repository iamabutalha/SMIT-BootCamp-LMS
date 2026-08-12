import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';
import { ROLES } from '../../constants/roles';

/**
 * PublicOnlyRoute Guard
 * Redirects already-authenticated users away from public auth pages (/admin/login, /student/login, /student/signup)
 * to their target dashboard/home page based on their role.
 */
export function PublicOnlyRoute({ children }) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const searchParams = new URLSearchParams(location.search);
    let redirectTarget = searchParams.get('redirect');
    const userRole = role ? String(role).toUpperCase() : '';

    let defaultRoleRoute = ROUTES.STUDENT.ROOT;
    if (userRole === ROLES.ADMIN) defaultRoleRoute = ROUTES.ADMIN.ROOT;
    if (userRole === ROLES.MENTOR) defaultRoleRoute = ROUTES.MENTOR.ROOT;

    // Prevent redirecting back to login or signup
    if (
      redirectTarget &&
      (redirectTarget === ROUTES.LOGIN ||
        redirectTarget === ROUTES.REGISTER ||
        redirectTarget === ROUTES.ADMIN.LOGIN ||
        redirectTarget === ROUTES.STUDENT.LOGIN ||
        redirectTarget === ROUTES.STUDENT.SIGNUP ||
        redirectTarget === '/signup')
    ) {
      redirectTarget = null;
    }

    // Ensure Admin stays in /admin/* and Student stays in /student/*
    if (userRole === ROLES.ADMIN && redirectTarget && !redirectTarget.startsWith('/admin')) {
      redirectTarget = ROUTES.ADMIN.ROOT;
    }
    if (userRole === ROLES.STUDENT && redirectTarget && !redirectTarget.startsWith('/student')) {
      redirectTarget = ROUTES.STUDENT.ROOT;
    }

    return <Navigate to={redirectTarget || defaultRoleRoute} replace />;
  }

  return children ? children : <Outlet />;
}

export default PublicOnlyRoute;
