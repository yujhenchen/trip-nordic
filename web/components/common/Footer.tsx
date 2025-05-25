import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { CopyRight } from "./copyRight";
import { NavMenuList } from "./navMenuList";
import { ModeToggle } from "./modeToggle";
import { ProfileMenuItem } from "./profile";
import { cn } from "@/lib/utils";

export function Footer({
	showHome = true,
	showNavMenu = true,
	showModeToggle = true,
	showProfile = true,
}: {
	showHome?: boolean;
	showNavMenu?: boolean;
	showModeToggle?: boolean;
	showProfile?: boolean;
}) {
	return (
		<footer
			className={cn(
				"bg-gray-200 rounded-t-3xl shadow dark:bg-gray-800 w-full",
				"mx-auto max-w-screen-xl px-8 py-4 md:flex md:items-center md:justify-between",
			)}
		>
			<CopyRight />

			{showNavMenu && (
				<NavigationMenu>
					<NavMenuList showHome={showHome} />
				</NavigationMenu>
			)}

			{(showProfile || showModeToggle) && (
				<div className="flex items-center space-x-4">
					{showProfile && (
						<NavigationMenu>
							<ProfileMenuItem />
						</NavigationMenu>
					)}
					{showModeToggle && <ModeToggle />}
				</div>
			)}
		</footer>
	);
}
