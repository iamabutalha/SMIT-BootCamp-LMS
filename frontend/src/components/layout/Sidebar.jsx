import { useState } from "react";
import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import BrandLogo from "../common/BrandLogo";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { useAppDispatch } from "../../hooks";
import { logout } from "../../store/slices/authSlice";
import authService from "../../services/authService";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    colorClass: "text-blue-500",
  },
  {
    label: "Students",
    path: "/students",
    icon: Users,
    colorClass: "text-emerald-500",
  },
  {
    label: "Attendance",
    path: "/attendance",
    icon: CalendarCheck,
    colorClass: "text-rose-500",
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: ClipboardList,
    colorClass: "text-amber-500",
  },
  {
    label: "Courses",
    path: "/courses",
    icon: BookOpen,
    colorClass: "text-indigo-500",
  },
  { label: "Teams", path: "/teams", icon: Users, colorClass: "text-cyan-500" },
];

function Sidebar({ isOpen, onClose }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const confirmLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore network errors
    } finally {
      setShowLogoutConfirm(false);
      dispatch(logout());
      navigate("/login", { replace: true });
      if (onClose) onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="
            fixed
            inset-0
            z-30
            bg-black/20
            lg:hidden
          "
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-40
          flex
          h-full
          w-64
          shrink-0
          flex-col
          border-r
          border-border
          bg-surface
          transition-transform
          duration-200
          lg:static
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <BrandLogo size="md" />

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-text-muted
              hover:bg-background
              hover:text-text
              lg:hidden
            "
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Main Menu
          </p>

          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                      flex
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-2.5
                      text-sm
                      font-medium
                      transition
                      ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-text-muted hover:bg-background hover:text-text"
                      }
                    `
                  }
                >
                  <Icon className={`h-8 w-6 shrink-0 ${item.colorClass}`} />

                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="shrink-0 space-y-1 border-t border-border p-4">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-2.5
                text-sm
                font-medium
                transition
                ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-text-muted hover:bg-background hover:text-text"
                }
              `
            }
          >
            <Settings className="h-5 w-5" />

            <span>Settings</span>
          </NavLink>

          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              px-3
              py-2.5
              text-sm
              font-medium
              text-danger
              transition
              hover:bg-danger/10
            "
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        title="Confirm Logout"
        size="sm"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLogoutConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={confirmLogout}
            >
              Log Out
            </Button>
          </>
        }
      >
        <p className="text-sm text-text">
          Are you sure you want to log out of Bootcamp LMS? You will need to log back in to access protected pages.
        </p>
      </Modal>
    </>
  );
}

export default Sidebar;


