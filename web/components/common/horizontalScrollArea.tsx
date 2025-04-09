import type { ScrollAreaProps } from "@radix-ui/react-scroll-area";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface Props extends ScrollAreaProps {}

export function HorizontalScrollArea({ children, ...props }: Props) {
	return (
		<ScrollArea {...props}>
			<div className="flex w-max space-x-4 p-4">{children}</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
