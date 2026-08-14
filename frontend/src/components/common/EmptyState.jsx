import { Inbox } from "lucide-react";

function EmptyState({
  title = "No data available",
  description = "There is nothing to display here yet.",
  icon: Icon = Inbox,
}) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center px-6 py-8 text-center">
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-primary/10
          text-primary
        "
      >
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-text">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-text-muted">
        {description}
      </p>
    </div>
  );
}

export default EmptyState;