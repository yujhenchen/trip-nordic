import type { ComponentProps, ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Card } from "../ui/card";

interface Props extends ComponentProps<typeof Card> {
	id: string;
}

export function DroppableCard({ id, children, className, ...props }: Props) {
	const { setNodeRef } = useDroppable({ id });
	return (
		<Card ref={setNodeRef} className={className} {...props}>
			{children}
		</Card>
	);
}
