import Spinner from "../ui/Spinner";

function LoadingState({
  message = "Loading...",
  size = "md",
  className = "",
}) {
  return (
    <div
      className={`
        flex
        min-h-[200px]
        w-full
        flex-col
        items-center
        justify-center
        gap-3
        ${className}
      `}
    >
      <Spinner size={size} />

      <p className="text-sm text-text-muted">
        {message}
      </p>
    </div>
  );
}

export default LoadingState;