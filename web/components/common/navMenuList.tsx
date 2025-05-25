import { cn } from "@/lib/utils";
import { defaultTrip, useTrips } from "@/states/useTripsState";
import {
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

const menuItemLinkStyle = cva(
	"relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:outline-none focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-accent-foreground after:transition-all after:duration-300 after:origin-center hover:after:left-0 hover:after:w-full",
);

type MenuItemType = {
	key: string;
	text: string;
	href: string;
};

function MenuItems({ showHome = false }: { showHome?: boolean }) {
	const trips = useTrips();

	const menuItems = [
		showHome && { key: "home", text: "Home", href: "/" },
		{
			key: "plan",
			text: "Plan",
			href:
				trips.length > 0 ? `/plan/${trips[0].id}` : `/plan/${defaultTrip.id}`,
		},
		{ key: "explore", text: "Explore", href: "/explore" },
		{ key: "about", text: "About", href: "/about" },
	].filter((item): item is MenuItemType =>
		Boolean(item),
	) satisfies Array<MenuItemType>;

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

export function NavMenuList({
	children,
	showHome,
}: {
	children?: ReactNode;
	showHome?: boolean;
}) {
	return (
		<NavigationMenuList className="flex items-center">
			<div className="flex grow">
				<MenuItems showHome={showHome} />
			</div>

			{children}
		</NavigationMenuList>
	);
}
