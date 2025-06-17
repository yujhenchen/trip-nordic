import type { HTMLAttributes } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props extends HTMLAttributes<HTMLDivElement> {
	id: string;
	index: number;
}

export function SortableItem({
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
		<div
			ref={setNodeRef}
			style={style}
			className={className}
			{...attributes}
			{...listeners}
			{...props}
		>
			{children}
		</div>
	);
}
