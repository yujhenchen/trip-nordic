import { cn } from "@/lib/utils";
import React from "react";

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

const FilterRowTitle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<p ref={ref} className={cn("font-medium", className)} {...props} />
));
FilterRowTitle.displayName = "FilterRowTitle";

interface FilterChipProps
	extends React.HTMLAttributes<HTMLDivElement>,
		React.RefAttributes<HTMLDivElement> {
	selected: boolean;
	value: string;
	selectedIcon?: React.ReactNode;
}

const FilterChip = ({
	selected,
	value,
	selectedIcon,
	ref,
	...props
}: FilterChipProps) => {
	return (
		<div className="flex flex-wrap gap-4" ref={ref} {...props}>
			<button
				type="button"
				className={cn(
					"inline-flex items-center justify-center",
					"px-4 py-2 rounded-full shadow-sm border space-x-2",
					"transition-all duration-100 ease-in-out",
					selected
						? "bg-blue-500 text-white border-blue-600 font-semibold shadow-sm dark:bg-blue-400 dark:text-white dark:border-blue-500"
						: "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600",
				)}
			>
				<span className="relative">
					<span className="invisible font-semibold">{value}</span>
					<span
						className={
							selected ? "font-semibold absolute inset-0" : "absolute inset-0"
						}
					>
						{value}
					</span>
				</span>
				{selected && selectedIcon}
			</button>
		</div>
	);
};

export { FilterTitle, FilterContent, FilterRowTitle, FilterChip };
