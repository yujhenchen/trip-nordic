import Logo from "./Logo";
import Sidebar from "./Sidebar";
import { ModeToggle } from "./modeToggle";
import {
  Link,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function Header() {
  return (
    <header className="flex py-8 items-center w-full">
      <Logo />
      <NavigationMenu className="w-full px-6">
        <NavigationMenuList className="flex items-center">
          <div className="flex grow">
            <NavigationMenuItem>
              <Link href="/plan">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Plan
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/explore">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Explore
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </div>

          <div className="flex gap-6 items-center">
            <NavigationMenuItem>
              <Link href="/login">
                <Avatar>
                  <AvatarImage
                    src="https://via.placeholder.com/150"
                    className="rounded-full w-12 aspect-square"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
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
