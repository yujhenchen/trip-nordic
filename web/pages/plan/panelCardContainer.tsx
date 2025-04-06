import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function PanelCardContainer({
	children,
	className,
	...rest
}: ComponentProps<typeof Card>) {
	return (
		<Card className={cn("my-2 h-36", className)} {...rest}>
			{children}
		</Card>
	);
}
