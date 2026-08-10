"use client";
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
const Avatar = React.forwardRef(({ className, src, name, fallback, children, ...props }, ref) => {
  const getInitials = (n) => {
    if (!n) return 'U';
    return n
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const hasDirectProps = Boolean(src || name || fallback);

  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 shadow-xs", className)}
      {...props}
    >
      {hasDirectProps ? (
        <>
          {src && <AvatarImage src={src} alt={name || 'User avatar'} />}
          <AvatarFallback className="bg-[#E8F7DF] text-[#006B3C] font-bold text-xs">
            {fallback || getInitials(name)}
          </AvatarFallback>
        </>
      ) : (
        children
      )}
    </AvatarPrimitive.Root>
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-[#E8F7DF] text-[#006B3C] font-bold text-xs", className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
export default Avatar;

