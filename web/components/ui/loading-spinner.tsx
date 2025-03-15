import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva(
	"inline-block rounded-full border-[3px] border-solid align-[-0.125em]",
	{
		variants: {
			size: {
				default: "size-8",
				sm: "size-6",
				lg: "size-12",
				xl: "size-16",
			},
			variant: {
				default: "border-primary/30 border-t-primary",
				secondary: "border-secondary/30 border-t-secondary",
				destructive: "border-destructive/30 border-t-destructive",
				muted: "border-muted/30 border-t-muted",
				blue: "border-blue-300 border-t-blue-600",
				green: "border-green-300 border-t-green-600",
				purple: "border-purple-300 border-t-purple-600",
				red: "border-red-300 border-t-red-600",
			},
			speed: {
				slow: "animate-[spin_3s_linear_infinite]",
				default: "animate-[spin_1.5s_linear_infinite]",
				fast: "animate-[spin_0.75s_linear_infinite]",
			},
		},
		defaultVariants: {
			size: "default",
			variant: "blue", // Changed default to blue for better visibility
			speed: "default",
		},
	},
);

export interface LoadingSpinnerProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof spinnerVariants> {
	asChild?: boolean;
}

const LoadingSpinner = React.forwardRef<HTMLSpanElement, LoadingSpinnerProps>(
	({ className, size, variant, speed, ...props }, ref) => {
		return (
			<span
				className={cn(spinnerVariants({ size, variant, speed }), className)}
				ref={ref}
				role="status"
				aria-label="Loading"
				{...props}
			/>
		);
	},
);
LoadingSpinner.displayName = "LoadingSpinner";

export { LoadingSpinner, spinnerVariants };
