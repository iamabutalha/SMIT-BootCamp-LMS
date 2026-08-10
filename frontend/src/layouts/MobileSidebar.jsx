import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { X, LayoutDashboard, Users, Layers, CalendarCheck, CheckSquare, FileCheck, Sliders } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { closeMobileSidebar } from '../app/store/slices/uiSlice';
import { ROLES } from '../constants/roles';
import { ROUTES } from '../constants/routes';
import { cn } from '../utils/cn';
import Logo from '../components/common/Logo';

export function MobileSidebar() {
  const dispatch = useDispatch();
  const mobileOpen = useSelector((state) => state.ui.mobileSidebarOpen);
  const { role } = useAuth();

  if (!mobileOpen) return null;

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
    <div className="fixed inset-0 z-50 lg:hidden flex">
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
        onClick={() => dispatch(closeMobileSidebar())}
      />
      <div className="relative flex-1 w-full max-w-xs bg-[#006B3C] text-white p-4 space-y-6 z-10 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <Logo variant="dark" size="sm" />
          <button
            type="button"
            onClick={() => dispatch(closeMobileSidebar())}
            className="p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end
                onClick={() => dispatch(closeMobileSidebar())}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-white/12 text-white font-semibold sidebar-item-active'
                      : 'text-emerald-100/80 hover:bg-white/8 hover:text-white'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn(
                        'w-4 h-4 shrink-0',
                        isActive ? 'text-lime-400' : 'text-emerald-200/70'
                      )}
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}

          <div className="pt-4 mt-4 border-t border-white/10">
            <NavLink
              to="/showcase"
              onClick={() => dispatch(closeMobileSidebar())}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-white/12 text-lime-400 font-semibold'
                    : 'text-emerald-100/80 hover:bg-white/8 hover:text-white'
                )
              }
            >
              <Sliders className="w-4 h-4 text-lime-400 shrink-0" />
              <span>UI Showcase</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileSidebar;
