import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { ModeToggle } from "./modeToggle";
import { ProfileLink } from "./profileLink";
import Logo from "./logo";
import { defaultTrip, useTrips } from "@/states/useTripsState";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const menuItemLinkStyle = cva(
	"relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:outline-none focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-accent-foreground after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full",
);

function MenuItems() {
	const trips = useTrips();

	const menuItems = [
		{
			key: "plan",
			text: "Plan",
			href:
				trips.length > 0 ? `/plan/${trips[0].id}` : `/plan/${defaultTrip.id}`,
		},
		{ key: "explore", text: "Explore", href: "/explore" },
		{ key: "about", text: "About", href: "/about" },
	];

	return menuItems.map((item) => (
		<NavigationMenuItem key={item.key}>
			<NavigationMenuLink
				className={cn(menuItemLinkStyle(), "bg-transparent")}
				href={item.href}
			>
				{item.text}
			</NavigationMenuLink>
		</NavigationMenuItem>
	));
}

export function Header() {
	return (
		<header className="flex p-4 items-center w-full h-24">
			<Logo />
			<NavigationMenu className="w-full px-6">
				<NavigationMenuList className="flex items-center">
					<div className="flex grow">
						<MenuItems />
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
