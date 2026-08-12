import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';

/**
 * PublicOnlyRoute Guard
 * Redirects already-authenticated users away from public pages (like /login or /signup)
 * to their target dashboard/home page.
 */
export function PublicOnlyRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const searchParams = new URLSearchParams(location.search);
    let redirectTarget = searchParams.get('redirect');
    if (
      redirectTarget &&
      (redirectTarget === ROUTES.LOGIN ||
        redirectTarget === ROUTES.REGISTER ||
        redirectTarget === '/signup')
    ) {
      redirectTarget = null;
    }
    return <Navigate to={redirectTarget || ROUTES.ROOT} replace />;
  }

  return children ? children : <Outlet />;
}

export default PublicOnlyRoute;
