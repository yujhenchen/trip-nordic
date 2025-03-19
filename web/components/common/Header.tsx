import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
	Link,
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import Logo from "./Logo";
import { ModeToggle } from "./modeToggle";
import { ProfileLink } from "./ProfileLink";

export function Header() {
	return (
		<header className="flex p-4 items-center w-full h-24">
			<Logo />
			<NavigationMenu className="w-full px-6">
				<NavigationMenuList className="flex items-center">
					<div className="flex grow">
						<NavigationMenuItem>
							<NavigationMenuLink
								className={navigationMenuTriggerStyle()}
								href="/plan"
							>
								Plan
							</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink
								className={navigationMenuTriggerStyle()}
								href="/explore"
							>
								Explore
							</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink
								className={navigationMenuTriggerStyle()}
								href="/about"
							>
								About
							</NavigationMenuLink>
						</NavigationMenuItem>
					</div>

					<div className="flex gap-6 items-center">
						<NavigationMenuItem>
							<ProfileLink />
						</NavigationMenuItem>

						<NavigationMenuItem>
							<ModeToggle />
						</NavigationMenuItem>
					</div>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
}
