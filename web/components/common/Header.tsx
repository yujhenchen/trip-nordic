import {
	NavigationMenu,
	NavigationMenuItem,
} from "@radix-ui/react-navigation-menu";
import { ModeToggle } from "./modeToggle";
import { ProfileLink } from "./profileLink";
import Logo from "./logo";
import { NavMenuList } from "./navMenuList";
import { cn } from "@/lib/utils";

interface Props {
	showLogo?: boolean;
	showNavMenu?: boolean;
	showModeToggle?: boolean;
}

export function Header({
	showLogo = true,
	showNavMenu = true,
	showModeToggle = true,
}: Props) {
	return (
		<header className={cn("flex p-4 items-center w-full h-24")}>
			{showLogo && <Logo />}
			{showNavMenu && (
				<NavigationMenu className="w-full px-6">
					<NavMenuList>
						<div className="flex gap-6 items-center">
							<NavigationMenuItem>
								<ProfileLink />
							</NavigationMenuItem>
						</div>
					</NavMenuList>
				</NavigationMenu>
			)}
			{showModeToggle && <ModeToggle className="px-2" />}
		</header>
	);
}
