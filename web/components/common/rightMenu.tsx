import { cn } from "@/lib/utils";
import { NavigationMenu } from "../ui/navigation-menu";
import { ThemeToggle } from "./themeToggle";
import { ProfileMenuItem } from "./profile";

interface Props {
	showProfile?: boolean;
	showModeToggle?: boolean;
	showBgColor?: boolean;
}

export function RightMenu({
	showProfile = true,
	showModeToggle = true,
	showBgColor = true,
}: Props) {
	if (!showProfile && !showModeToggle) {
		return null;
	}

	return (
		<div className="flex items-center space-x-4">
			{showProfile && (
				<NavigationMenu
					className={cn({
						"bg-gray-400 dark:bg-gray-600 shadow rounded-3xl px-4 py-2":
							showBgColor,
					})}
				>
					<ProfileMenuItem />
				</NavigationMenu>
			)}
			{showModeToggle && <ThemeToggle />}
		</div>
	);
}
