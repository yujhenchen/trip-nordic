import type { ComponentProps } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PanelContainer({
	children,
	className,
	...rest
}: ComponentProps<typeof Card>) {
	return (
		<Card
			className={cn(
				"bg-gray-200 dark:bg-gray-600 overflow-hidden shrink-0 w-full h-full md:w-72 flex flex-col",
				"shadow-lg",
				className,
			)}
			{...rest}
		>
			{children}
		</Card>
	);
}
