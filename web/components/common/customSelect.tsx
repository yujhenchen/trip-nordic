import type { ComponentProps } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useTheme } from "../providers/ThemeProvider";

const customStyles = (isDarkMode: boolean) => ({
	control: (provided: any) => ({
		...provided,
		backgroundColor: isDarkMode ? "#222" : "white",
		color: isDarkMode ? "white" : "black",
	}),
	menu: (provided: any) => ({
		...provided,
		backgroundColor: isDarkMode ? "#333" : "white",
		color: isDarkMode ? "white" : "black",
	}),
	option: (provided: any, state: any) => ({
		...provided,
		backgroundColor: state.isFocused
			? isDarkMode
				? "#555"
				: "#eee"
			: isDarkMode
				? "#333"
				: "white",
		color: isDarkMode ? "white" : "black",
		cursor: "pointer",
	}),
});

interface Props extends ComponentProps<typeof Select> {
	// options: { value: string; label: string }[];
}

const animatedComponents = makeAnimated();
export function CustomSelect({ ...rest }: Props) {
	const { theme } = useTheme();
	const isDarkMode = theme === "dark";
	return (
		<Select
			components={animatedComponents}
			{...rest}
			styles={customStyles(isDarkMode)}
		/>
	);
}
