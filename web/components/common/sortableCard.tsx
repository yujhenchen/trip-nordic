import type { ComponentProps, ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "../ui/card";

interface Props extends ComponentProps<typeof Card> {
	id: string;
	index: number;
}

export function SortableCard({
	id,
	index,
	children,
	className,
	...props
}: Props) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });
	const style = { transform: CSS.Transform.toString(transform), transition };
	return (
		<Card
			ref={setNodeRef}
			style={style}
			className={className}
			{...attributes}
			{...listeners}
			{...props}
		>
			{children}
		</Card>
	);
}
