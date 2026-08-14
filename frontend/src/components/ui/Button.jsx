import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary/90 focus:ring-primary",

  secondary:
    "bg-mint text-text hover:bg-mint/80 focus:ring-primary",

  outline:
    "border border-border bg-surface text-text hover:bg-background focus:ring-primary",

  danger:
    "bg-danger text-white hover:bg-danger/90 focus:ring-danger",

  ghost:
    "bg-transparent text-text hover:bg-background focus:ring-primary",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-lg
        font-medium
        transition-colors
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}

      {children}
    </button>
  );
}

export default Button;