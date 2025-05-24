import {
	NavigationMenu,
	NavigationMenuItem,
} from "@radix-ui/react-navigation-menu";
import { ModeToggle } from "./modeToggle";
import { ProfileLink } from "./profileLink";
import Logo from "./logo";
import { NavMenuList } from "./navMenuList";

export function Header() {
	return (
		<header className="flex p-4 items-center w-full h-24">
			<Logo />
			<NavigationMenu className="w-full px-6">
				<NavMenuList>
					<div className="flex gap-6 items-center">
						<NavigationMenuItem>
							<ProfileLink />
						</NavigationMenuItem>

						<NavigationMenuItem>
							<ModeToggle />
						</NavigationMenuItem>
					</div>
				</NavMenuList>
			</NavigationMenu>
		</header>
	);
}
