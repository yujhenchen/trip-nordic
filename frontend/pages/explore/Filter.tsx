import React from "react";
import { cn } from "@/lib/utils";

const FilterTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("font-semibold p-3", className)} {...props} />
));
FilterTitle.displayName = "FilterTitle";

const FilterContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-4 p-6", className)}
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
    className={cn("flex items-center space-x-3", className)}
    {...props}
  />
));
FilterRow.displayName = "FilterRow";

const FilterRowTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("font-medium", className)} {...props} />
));
FilterRowTitle.displayName = "FilterRowTitle";

const FilterOptionsContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex space-x-3 overflow-x-scroll", className)}
    {...props}
  />
));
FilterOptionsContainer.displayName = "FilterOptionsContainer";

export {
  FilterTitle,
  FilterContent,
  FilterRow,
  FilterRowTitle,
  FilterOptionsContainer,
};
