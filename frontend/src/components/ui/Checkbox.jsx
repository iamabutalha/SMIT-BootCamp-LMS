import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef(({
  className,
  label,
  isDisabled = false,
  isLoading = false,
  disabled = false,
  ...props
}, ref) => {
  const isCheckboxDisabled = disabled || isDisabled || isLoading;

  return (
    <div className="inline-flex items-center gap-2">
      <CheckboxPrimitive.Root
        ref={ref}
        disabled={isCheckboxDisabled}
        className={cn(
          "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn("grid place-content-center text-current")}>
          <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && <span className="text-sm font-medium text-slate-700 cursor-pointer">{label}</span>}
    </div>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
export { Checkbox };
export default Checkbox;
