import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../constants/roles';
import { ROUTES } from '../constants/routes';

export function RootRedirect() {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  switch (role) {
    case ROLES.ADMIN:
      return <Navigate to={ROUTES.ADMIN.ROOT} replace />;
    case ROLES.MENTOR:
      return <Navigate to={ROUTES.MENTOR.ROOT} replace />;
    case ROLES.STUDENT:
    default:
      return <Navigate to={ROUTES.STUDENT.ROOT} replace />;
  }
}

export default RootRedirect;
