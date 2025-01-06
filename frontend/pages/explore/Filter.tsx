import React from "react";
import { cn } from "@/lib/utils";

const Filter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Filter.displayName = "Filter";

const FilterTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    // className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
FilterTitle.displayName = "FilterTitle";

const FilterContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
FilterContent.displayName = "FilterContent";

const FilterRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
FilterRow.displayName = "FilterRow";

const FilterOption = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

export { Filter, FilterTitle, FilterContent, FilterRow, FilterOption };
