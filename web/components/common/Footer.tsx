import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { CopyRight } from "./copyRight";
import { NavMenuList } from "./navMenuList";
import { ModeToggle } from "./modeToggle";

export function Footer({
	showHome = false,
	showModeToggle = false,
}: {
	showHome?: boolean;
	showModeToggle?: boolean;
}) {
	return (
		<footer className="bg-gray-200 rounded-t-[2rem] shadow dark:bg-gray-800 w-full">
			<div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
				<CopyRight />

				<NavigationMenu>
					<NavMenuList showHome={showHome} />
				</NavigationMenu>

				{showModeToggle && <ModeToggle />}
			</div>
		</footer>
	);
}
