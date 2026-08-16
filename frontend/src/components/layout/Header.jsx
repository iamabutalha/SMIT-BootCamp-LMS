import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  CheckCheck,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout } from "../../store/slices/authSlice";
import authService from "../../services/authService";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

function Header({
  title = "Dashboard",
  subtitle,
  onMenuClick,
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome to Bootcamp LMS",
      message: "Your administrator portal is ready.",
      time: "10m ago",
      read: false,
    },
    {
      id: 2,
      title: "System Update",
      message: "Database & routing audit complete.",
      time: "1h ago",
      read: false,
    },
    {
      id: 3,
      title: "Attendance Alert",
      message: "Today's student attendance has been updated.",
      time: "3h ago",
      read: true,
    },
  ]);

  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "A";
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore network errors
    } finally {
      setShowLogoutConfirm(false);
      dispatch(logout());
      navigate("/login", { replace: true });
    }
  };

  const handleQuickNavigate = (path) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(path);
  };

  const searchResults = [
    { label: "Students Portal", path: "/students", category: "Management" },
    { label: "Attendance Records", path: "/attendance", category: "Management" },
    { label: "Task List", path: "/tasks", category: "Tasks" },
    { label: "Bootcamp Teams", path: "/teams", category: "Teams" },
    { label: "Courses & Programs", path: "/courses", category: "Academic" },
    { label: "Account Settings", path: "/settings", category: "Account" },
  ].filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border bg-surface">
        <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={onMenuClick}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-text-muted
              transition
              hover:bg-background
              hover:text-text
              lg:hidden
            "
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Page Title & Subtitle */}
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold text-text">
              {title}
            </h1>

            {subtitle && (
              <p className="hidden truncate text-xs text-text-muted sm:block">
                {subtitle}
              </p>
            )}
          </div>

          {/* Quick Search Button */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-text-muted
              transition
              hover:bg-background
              hover:text-text
            "
            title="Search modules (Ctrl+K)"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Notifications Dropdown Container */}
          <div className="relative" ref={notificationsRef}>
            <button
              type="button"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="
                relative
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-text-muted
                transition
                hover:bg-background
                hover:text-text
              "
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    right-1.5
                    top-1.5
                    flex
                    h-2
                    w-2
                    rounded-full
                    bg-danger
                  "
                />
              )}
            </button>

            {/* Notifications Popover */}
            {isNotificationsOpen && (
              <div
                className="
                  absolute
                  right-0
                  mt-2
                  w-80
                  rounded-xl
                  border
                  border-border
                  bg-surface
                  p-0
                  shadow-xl
                  sm:w-96
                "
              >
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-text">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                        {unreadCount} new
                      </span>
                    )}
                  </div>

                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllRead}
                      className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <CheckCheck className="h-3.5 w-3.5" />
                      Mark read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-border">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 transition hover:bg-background/60 ${
                        !item.read ? "bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-text">
                          {item.title}
                        </p>
                        <span className="text-[10px] text-text-muted shrink-0">
                          {item.time}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-text-muted">
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar & Profile Dropdown Container */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-primary
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-primary/90
                focus:outline-none
                focus:ring-2
                focus:ring-primary/30
              "
              aria-label="User profile menu"
            >
              {userInitial}
            </button>

            {/* Profile Dropdown Popover */}
            {isProfileOpen && (
              <div
                className="
                  absolute
                  right-0
                  mt-2
                  w-64
                  rounded-xl
                  border
                  border-border
                  bg-surface
                  p-2
                  shadow-xl
                "
              >
                {/* User Info Header */}
                <div className="border-b border-border p-3">
                  <p className="truncate text-sm font-semibold text-text">
                    {user?.name || "Bootcamp Admin"}
                  </p>
                  <p className="truncate text-xs text-text-muted">
                    {user?.email || "admin@example.com"}
                  </p>
                  <div className="mt-2">
                    <span className="inline-block rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {user?.role || "ADMIN"}
                    </span>
                  </div>
                </div>

                {/* Profile Links */}
                <div className="py-1">
                  <Link
                    to="/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="
                      flex
                      items-center
                      gap-2.5
                      rounded-lg
                      px-3
                      py-2
                      text-xs
                      font-medium
                      text-text
                      transition
                      hover:bg-background
                    "
                  >
                    <Settings className="h-4 w-4 text-text-muted" />
                    <span>Account Settings</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-2.5
                      rounded-lg
                      px-3
                      py-2
                      text-xs
                      font-medium
                      text-danger
                      transition
                      hover:bg-danger/10
                    "
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Quick Search Modal */}
      <Modal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        title="Quick Module Search"
        size="md"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search LMS modules, students, tasks..."
              className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="max-h-60 overflow-y-auto space-y-1">
            {searchResults.length === 0 ? (
              <p className="p-4 text-center text-xs text-text-muted">
                No matching modules found.
              </p>
            ) : (
              searchResults.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleQuickNavigate(item.path)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-background"
                >
                  <span className="font-medium text-text">{item.label}</span>
                  <span className="text-xs font-semibold text-text-muted uppercase">
                    {item.category}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      </Modal>

      {/* Header Logout Confirmation Modal */}
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
            <Button variant="danger" size="sm" onClick={handleLogout}>
              Log Out
            </Button>
          </>
        }
      >
        <p className="text-sm text-text">
          Are you sure you want to log out of Bootcamp LMS?
        </p>
      </Modal>
    </>
  );
}

export default Header;