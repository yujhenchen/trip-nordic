import { useDraggable } from "@dnd-kit/core";
import type { HTMLAttributes } from "react";
import { CSS } from "@dnd-kit/utilities";

interface Props extends HTMLAttributes<HTMLDivElement> {
	id: string;
	index: number;
}

export function DraggableBox({
	id,
	index,
	children,
	className,
	...props
}: Props) {
	const {
		// attributes, listeners,
		setNodeRef,
		transform,
	} = useDraggable({
		id,
		data: {
			index,
		},
	});
	const style = { transform: CSS.Transform.toString(transform) };
	return (
		<div
			ref={setNodeRef}
			// {...listeners}
			// {...attributes}
			style={style}
			className={className}
			{...props}
		>
			{children}
		</div>
	);
}
