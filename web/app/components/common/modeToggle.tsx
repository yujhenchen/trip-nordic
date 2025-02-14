import { Toggle } from "@radix-ui/react-toggle";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<Toggle
			aria-label="Toggle Mode"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
		>
			{theme === "dark" ? <Sun /> : <Moon />}
		</Toggle>
	);
}
