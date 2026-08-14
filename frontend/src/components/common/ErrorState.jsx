import { AlertCircle } from "lucide-react";

function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the requested data. Please try again.",
  action,
  className = "",
}) {
  return (
    <div
      className={`
        flex
        min-h-[240px]
        w-full
        flex-col
        items-center
        justify-center
        rounded-xl
        border
        border-danger/20
        bg-surface
        px-6
        py-10
        text-center
        ${className}
      `}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-danger/10">
        <AlertCircle className="h-6 w-6 text-danger" />
      </div>

      <h3 className="text-base font-semibold text-text">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-text-muted">
        {message}
      </p>

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  );
}

export default ErrorState;