import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

function Header({
  title = "Dashboard",
  subtitle,
  onMenuClick,
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">

        {/* Mobile Menu */}
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

        {/* Page Information */}
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

        {/* Search */}
        <button
          type="button"
          className="
            hidden
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            text-text-muted
            transition
            hover:bg-background
            hover:text-text
            sm:flex
          "
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <button
          type="button"
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

          {/* Notification Indicator */}
          <span
            className="
              absolute
              right-1.5
              top-1.5
              h-2
              w-2
              rounded-full
              bg-danger
            "
          />
        </button>

        {/* User Avatar */}
        <button
          type="button"
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
          "
          aria-label="User profile"
        >
          H
        </button>

      </div>
    </header>
  );
}

export default Header;