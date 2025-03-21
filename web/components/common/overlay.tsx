import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Props {
	className?: string;
	children: ReactNode;
}

export function Overlay({ className, children }: Props) {
	return (
		<div
			className={cn(
				"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50",
				"flex flex-col space-y-4",
				className,
			)}
		>
			{children}
		</div>
	);
}
