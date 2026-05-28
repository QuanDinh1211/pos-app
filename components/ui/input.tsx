import { cn } from "@/lib/function";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full h-touch-target-min border-2 border-outline-variant/50 rounded-lg px-md focus:border-tertiary focus:ring-0 focus:outline-none outline-none transition-all font-body-md",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
