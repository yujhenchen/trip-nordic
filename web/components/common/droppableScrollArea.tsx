import { type ComponentProps, ReactNode } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { useDroppable } from "@dnd-kit/core";

interface Props extends ComponentProps<typeof ScrollArea> {
	id: string;
}

export function DroppableScrollArea({
	id,
	children,
	className,
	...props
}: Props) {
	const { setNodeRef } = useDroppable({ id });
	return (
		<ScrollArea ref={setNodeRef} className={className} {...props}>
			{children}
		</ScrollArea>
	);
}
