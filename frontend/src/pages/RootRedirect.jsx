import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../constants/roles';
import { ROUTES } from '../constants/routes';

export function RootRedirect({ section }) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const fullPath = location.pathname + location.search;
    let targetLogin = ROUTES.STUDENT.LOGIN;
    if (location.pathname.startsWith('/admin')) {
      targetLogin = ROUTES.ADMIN.LOGIN;
    }
    return (
      <Navigate
        to={`${targetLogin}?redirect=${encodeURIComponent(fullPath)}`}
        state={{ from: location }}
        replace
      />
    );
  }

  const userRole = role ? String(role).toUpperCase() : '';

  if (section) {
    if (userRole === ROLES.ADMIN) {
      if (section === 'students') return <Navigate to={ROUTES.ADMIN.STUDENTS} replace />;
      if (section === 'attendance') return <Navigate to={ROUTES.ADMIN.ATTENDANCE} replace />;
      if (section === 'progress') return <Navigate to="/admin/progress" replace />;
      if (section === 'tasks' || section === 'assignments') return <Navigate to={ROUTES.ADMIN.TASKS} replace />;
      if (section === 'cohorts' || section === 'teams' || section === 'courses') return <Navigate to={ROUTES.ADMIN.COHORTS} replace />;
      if (section === 'quizzes') return <Navigate to={ROUTES.ADMIN.QUIZZES} replace />;
      if (section === 'teachers' || section === 'mentors') return <Navigate to={ROUTES.ADMIN.TEACHERS} replace />;
      if (section === 'reports') return <Navigate to={ROUTES.ADMIN.REPORTS} replace />;
      if (section === 'profile') return <Navigate to={ROUTES.ADMIN.PROFILE} replace />;
    } else if (userRole === ROLES.MENTOR) {
      if (section === 'cohorts' || section === 'teams' || section === 'courses') return <Navigate to={ROUTES.MENTOR.COHORTS} replace />;
      if (section === 'attendance') return <Navigate to={ROUTES.MENTOR.ATTENDANCE} replace />;
      if (section === 'tasks' || section === 'assignments') return <Navigate to={ROUTES.MENTOR.TASKS} replace />;
    } else if (userRole === ROLES.STUDENT) {
      if (section === 'tasks' || section === 'assignments') return <Navigate to={ROUTES.STUDENT.TASKS} replace />;
      if (section === 'quizzes') return <Navigate to={ROUTES.STUDENT.QUIZZES} replace />;
      if (section === 'attendance') return <Navigate to={ROUTES.STUDENT.ATTENDANCE} replace />;
      if (section === 'profile') return <Navigate to={ROUTES.STUDENT.PROFILE} replace />;
    }
  }

  switch (userRole) {
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

