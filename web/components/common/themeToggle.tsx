import { Toggle } from "@radix-ui/react-toggle";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
}

export function ThemeToggle({ className }: Props) {
	const { theme, setTheme } = useTheme();

	return (
		<Toggle
			className={cn(
				"inline-flex items-center justify-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				"bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full",
				"aspect-square p-2",
				className,
			)}
			aria-label="Toggle Theme"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
		>
			{theme === "dark" ? <Sun /> : <Moon />}
		</Toggle>
	);
}
