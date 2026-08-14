const variants = {
  success: "bg-success/20 text-green-800",
  warning: "bg-warning/15 text-yellow-800",
  danger: "bg-danger/15 text-red-800",
  info: "bg-primary/10 text-primary",
  neutral: "bg-gray-100 text-gray-700",
  mint: "bg-mint text-green-800",
};

function Badge({
  children,
  variant = "neutral",
  className = "",
}) {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-2.5
        py-1
        text-xs
        font-medium
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;