import type { ScrollAreaProps } from "@radix-ui/react-scroll-area";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

interface Props extends ScrollAreaProps {
	fullHeight?: boolean;
}

export function HorizontalScrollArea({
	children,
	fullHeight = false,
	...props
}: Props) {
	return (
		<ScrollArea fullHeight={fullHeight} {...props}>
			<div
				className={cn("flex w-max space-x-4 p-4 h-full", {
					"h-full": fullHeight,
				})}
			>
				{children}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
