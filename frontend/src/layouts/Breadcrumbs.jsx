import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTES } from '../constants/routes';

const LABEL_MAP = {
  admin: 'Admin',
  student: 'Student',
  mentor: 'Mentor',
  cohorts: 'Teams',
  courses: 'Teams',
  teams: 'Teams',
  users: 'Students',
  students: 'Students',
  attendance: 'Attendance',
  tasks: 'Assignments',
  assignments: 'Assignments',
  profile: 'Settings',
  teachers: 'Teachers',
  progress: 'Progress',
  payment: 'Payment',
  reports: 'Reports',
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 py-1 select-none font-sans">
      <Link
        to={ROUTES.ROOT}
        className="flex items-center gap-1 hover:text-[#006B3C] transition-colors font-medium"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const key = value.toLowerCase();
        const formattedName = LABEL_MAP[key] || (value.charAt(0).toUpperCase() + value.slice(1));

        return (
          <div key={to} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-slate-400" />
            {isLast ? (
              <span className="font-bold text-[#006B3C]">{formattedName}</span>
            ) : (
              <Link to={to} className="hover:text-[#006B3C] transition-colors font-medium">
                {formattedName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
