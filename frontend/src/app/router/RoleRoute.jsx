import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';

/**
 * Route guard checking role-based permissions (RBAC)
 * @param {{ allowedRoles: Array<string>, children?: React.ReactNode }} props
 */
export function RoleRoute({ allowedRoles = [], children }) {
  const { role } = useAuth();

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return children ? children : <Outlet />;
}

export default RoleRoute;
