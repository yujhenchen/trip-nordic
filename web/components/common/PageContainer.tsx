import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Props {
	className?: string;
	children: ReactNode;
}

export function PageContainer({ children, className }: Props) {
	return (
		<main
			id="page-container"
			className={cn("container flex flex-1 flex-col pb-12 mx-auto", className)}
		>
			{children}
		</main>
	);
}
