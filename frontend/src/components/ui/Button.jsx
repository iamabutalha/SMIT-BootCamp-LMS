import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            primary: "bg-[#006B3C] text-white shadow hover:bg-[#005530]",
            destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
            default: "h-9 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-10 rounded-md px-8",
            icon: "h-9 w-9",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

const Button = React.forwardRef(({
    className,
    variant,
    size,
    asChild = false,
    fullWidth = false,
    isLoading = false,
    isDisabled = false,
    disabled = false,
    icon,
    leftIcon,
    rightIcon,
    children,
    ...props
}, ref) => {
    const Comp = asChild ? Slot : "button";
    const isButtonDisabled = disabled || isDisabled || isLoading;
    const renderLeftIcon = isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (icon || leftIcon);

    return (
        <Comp
            className={cn(
                buttonVariants({ variant, size }),
                fullWidth && "w-full flex justify-center",
                className
            )}
            ref={ref}
            disabled={isButtonDisabled}
            {...props}
        >
            {renderLeftIcon}
            {children}
            {rightIcon}
        </Comp>
    );
});

Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;
