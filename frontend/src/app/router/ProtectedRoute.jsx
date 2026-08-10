import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';

/**
 * ProtectedRoute Guard
 * Requires active authentication session and preserves target URL in ?redirect=
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
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

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
