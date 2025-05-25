import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import Logo from "./logo";
import { NavMenuList } from "./navMenuList";
import { cn } from "@/lib/utils";
import { RightMenu } from "./rightMenu";

interface Props {
	showLogo?: boolean;
	showNavMenu?: boolean;
	showModeToggle?: boolean;
	showProfile?: boolean;
}

export function Header({
	showLogo = true,
	showNavMenu = true,
	showModeToggle = true,
	showProfile = true,
}: Props) {
	return (
		<header className={cn("flex p-4 items-center w-full h-24 justify-between")}>
			<div className="flex items-center">
				{showLogo && <Logo />}
				{showNavMenu && (
					<NavigationMenu>
						<NavMenuList />
					</NavigationMenu>
				)}
			</div>

			<RightMenu showProfile={showProfile} showModeToggle={showModeToggle} />
		</header>
	);
}
