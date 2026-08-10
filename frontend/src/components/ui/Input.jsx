import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({
  className,
  type = "text",
  label,
  error,
  icon,
  leftIcon,
  rightIcon,
  isDisabled = false,
  isLoading = false,
  fullWidth = false,
  disabled = false,
  ...props
}, ref) => {
  const isInputDisabled = disabled || isDisabled || isLoading;
  const renderLeftIcon = icon || leftIcon;

  return (
    <div className={cn("w-full text-left space-y-1.5", fullWidth && "w-full")}>
      {label && (
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {renderLeftIcon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none">
            {renderLeftIcon}
          </div>
        )}
        <input
          type={type}
          disabled={isInputDisabled}
          className={cn(
            "flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-2xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006B3C] focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
            renderLeftIcon && "pl-9",
            rightIcon && "pr-9",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 text-slate-400 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";
export { Input };
export default Input;
