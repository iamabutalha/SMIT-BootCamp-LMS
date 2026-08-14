import { Loader2 } from "lucide-react";

const sizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

function Spinner({
  size = "md",
  className = "",
}) {
  return (
    <Loader2
      className={`
        animate-spin
        text-primary
        ${sizes[size]}
        ${className}
      `}
      aria-label="Loading"
    />
  );
}

export default Spinner;