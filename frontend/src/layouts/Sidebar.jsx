import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Layers,
  CalendarCheck,
  CheckSquare,
  FileCheck,
  Sliders,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../constants/roles';
import { ROUTES } from '../constants/routes';
import { cn } from '../utils/cn';
import Logo from '../components/common/Logo';

export function Sidebar() {
  const { role } = useAuth();
  const location = useLocation();

  const getNavItems = () => {
    switch (role) {
      case ROLES.ADMIN:
        return [
          { label: 'Overview', to: ROUTES.ADMIN.ROOT, icon: LayoutDashboard },
          { label: 'Users', to: ROUTES.ADMIN.USERS, icon: Users },
          { label: 'Cohorts', to: ROUTES.ADMIN.COHORTS, icon: Layers },
          { label: 'Attendance', to: ROUTES.ADMIN.ATTENDANCE, icon: CalendarCheck },
          { label: 'Tasks', to: ROUTES.ADMIN.TASKS, icon: CheckSquare },
        ];
      case ROLES.MENTOR:
        return [
          { label: 'Overview', to: ROUTES.MENTOR.ROOT, icon: LayoutDashboard },
          { label: 'My Cohorts', to: ROUTES.MENTOR.COHORTS, icon: Layers },
          { label: 'Attendance', to: ROUTES.MENTOR.ATTENDANCE, icon: CalendarCheck },
          { label: 'Tasks', to: ROUTES.MENTOR.TASKS, icon: CheckSquare },
          { label: 'Submissions', to: ROUTES.MENTOR.SUBMISSIONS, icon: FileCheck },
        ];
      case ROLES.STUDENT:
      default:
        return [
          { label: 'My Overview', to: ROUTES.STUDENT.ROOT, icon: LayoutDashboard },
          { label: 'My Tasks', to: ROUTES.STUDENT.TASKS, icon: CheckSquare },
          { label: 'My Attendance', to: ROUTES.STUDENT.ATTENDANCE, icon: CalendarCheck },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="hidden lg:flex flex-col w-[264px] bg-[#006B3C] text-white shrink-0 min-h-screen p-4 space-y-6 shadow-md select-none font-sans">
      {/* Brand Header */}
      <div className="px-2 py-3 border-b border-white/10">
        <Logo variant="dark" size="md" />
      </div>

      {/* Main Navigation List */}
      <div className="flex-1 space-y-1">
        <p className="px-3 text-[11px] font-semibold text-emerald-200/60 uppercase tracking-widest mb-2">
          Menu
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isCurrentActive = location.pathname === item.to;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end
              onClick={(e) => {
                if (isCurrentActive) {
                  e.preventDefault(); // Prevent redundant reload if already on current route
                }
              }}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative group',
                  isActive
                    ? 'bg-white/12 text-white font-semibold sidebar-item-active shadow-2xs'
                    : 'text-emerald-100/80 hover:bg-white/8 hover:text-white'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      'w-4 h-4 shrink-0 transition-colors',
                      isActive ? 'text-[#4DBD18]' : 'text-emerald-200/70 group-hover:text-white'
                    )}
                  />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}

        {/* Foundation Showcase Link for Dev Validation */}
        <div className="pt-4 mt-4 border-t border-white/10">
          <p className="px-3 text-[11px] font-semibold text-emerald-200/60 uppercase tracking-widest mb-2">
            Dev Showcase
          </p>
          <NavLink
            to="/showcase"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-white/12 text-[#4DBD18] font-semibold'
                  : 'text-emerald-100/80 hover:bg-white/8 hover:text-white'
              )
            }
          >
            <Sliders className="w-4 h-4 text-[#4DBD18] shrink-0" />
            <span>UI Showcase</span>
          </NavLink>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="px-3 py-2 text-[11px] text-emerald-200/50 border-t border-white/10">
        Saylani Mass IT Training (SMIT)
      </div>
    </aside>
  );
}

export default Sidebar;
