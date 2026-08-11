import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';

/**
 * Route guard checking role-based permissions (RBAC)
 * @param {{ allowedRoles: Array<string>, children?: React.ReactNode }} props
 */
export function RoleRoute({ allowedRoles = [], children }) {
  const { role, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  const userRole = role ? String(role).toUpperCase() : null;
  const allowedUpper = allowedRoles.map((r) => String(r).toUpperCase());

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!userRole || !allowedUpper.includes(userRole)) {
    return <Navigate to={ROUTES.ROOT} replace />;
  }

  return children ? children : <Outlet />;
}

export default RoleRoute;
