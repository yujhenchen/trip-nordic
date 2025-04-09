import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { ScrollAreaProps } from "@radix-ui/react-scroll-area";
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

const FilterOptionsContainer = ({ children, ...props }: ScrollAreaProps) => (
	<ScrollArea {...props}>
		<div className="flex w-max space-x-4 p-4">{children}</div>
		<ScrollBar orientation="horizontal" />
	</ScrollArea>
);
FilterOptionsContainer.displayName = "FilterOptionsContainer";

interface FilterChipProps
	extends React.HTMLAttributes<HTMLDivElement>,
		React.RefAttributes<HTMLDivElement> {
	selected: boolean;
	value: string;
	selectedIcon: React.ReactNode;
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
					"flex items-center px-4 py-2 rounded-full shadow-sm border space-x-2",
					selected
						? "bg-blue-100 text-blue-800 border-blue-400"
						: "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
				)}
			>
				<span>{value}</span>
				{selected ? selectedIcon : null}
			</button>
		</div>
	);
};

export {
	FilterTitle,
	FilterContent,
	FilterRowTitle,
	FilterOptionsContainer,
	FilterChip,
};
