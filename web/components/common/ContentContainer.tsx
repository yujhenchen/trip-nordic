import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function ContentContainer({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"bg-gray-200/80 dark:bg-gray-600/80 w-full flex-1 flex flex-col space-y-8 place-content-center rounded-3xl",
				className,
			)}
		>
			{children}
		</div>
	);
}
