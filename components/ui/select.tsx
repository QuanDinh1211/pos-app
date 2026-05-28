import { cn } from "@/lib/function";
import * as React from "react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full h-touch-target-min border-2 border-outline-variant/50 rounded-lg px-md focus:border-tertiary focus:ring-0 focus:outline-none outline-none transition-all font-body-md bg-surface",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);
Select.displayName = "Select";

export { Select };
