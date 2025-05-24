import { cn } from "@/lib/utils";

export function H1({ text, className }: { text: string; className?: string }) {
	return (
		<h1
			className={cn(
				"scroll-m-20 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight",
				className,
			)}
		>
			{text}
		</h1>
	);
}
