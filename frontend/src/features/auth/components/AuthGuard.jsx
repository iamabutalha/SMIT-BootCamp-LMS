import { useSelector } from 'react-redux';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { selectIsAuthenticated, selectUserRole } from '../authSelectors';
import { ROUTES } from '@/constants/routes';

/**
 * Auth & RBAC Route Guard Component
 * Preserves intended destination in query param `?redirect=` when unauthenticated
 */
export function AuthGuard({ allowedRoles, children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);
  const location = useLocation();

  if (!isAuthenticated) {
    const fullPath = location.pathname + location.search;
    return (
      <Navigate
        to={`${ROUTES.LOGIN}?redirect=${encodeURIComponent(fullPath)}`}
        state={{ from: location }}
        replace
      />
    );
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!userRole || !allowedRoles.includes(userRole)) {
      return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
    }
  }

  return children ? children : <Outlet />;
}

export default AuthGuard;
