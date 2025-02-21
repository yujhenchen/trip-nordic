import { ComponentProps } from "react";
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
				"bg-gray-200 overflow-hidden shrink-0 w-full h-full md:w-72 flex flex-col",
				className
			)}
			{...rest}
		>
			{children}
		</Card>
	);
}
