import { cn } from "@/lib/utils";

export function H1({ text, className }: { text: string; className?: string }) {
	return (
		<h1
			className={cn(
				"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
				className
			)}
		>
			{text}
		</h1>
	);
}
