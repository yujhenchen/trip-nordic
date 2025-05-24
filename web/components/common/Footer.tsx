import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { CopyRight } from "./copyRight";
import { NavMenuList } from "./navMenuList";

export function Footer() {
	return (
		<footer className="bg-white rounded-t-[2rem] shadow dark:bg-gray-800 w-full">
			<div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
				<CopyRight />

				<NavigationMenu>
					<NavMenuList />
				</NavigationMenu>
			</div>
		</footer>
	);
}
