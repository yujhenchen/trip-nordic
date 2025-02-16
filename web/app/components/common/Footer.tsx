import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { CopyRight } from "./CopyRight";

export function Footer() {
	return (
		<footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 w-full">
			<div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
				<CopyRight />

				<NavigationMenu>
					<NavigationMenuList className="flex items-center">
						<div className="flex grow">
							<NavigationMenuItem>
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
									href="/"
								>
									Home
								</NavigationMenuLink>
							</NavigationMenuItem>

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
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</footer>
	);
}
