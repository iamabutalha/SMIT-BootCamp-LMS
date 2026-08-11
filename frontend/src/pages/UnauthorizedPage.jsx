import { Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export function UnauthorizedPage() {
  return <Navigate to={ROUTES.ROOT} replace />;
}

export default UnauthorizedPage;
