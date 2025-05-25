import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function H2({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<h1
			className={cn(
				"scroll-m-20 text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold tracking-tight",
				className,
			)}
		>
			{children}
		</h1>
	);
}
