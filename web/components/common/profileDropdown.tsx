import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/states/useAuthStore";
import { LayoutDashboardIcon, LogOutIcon } from "lucide-react";
import type { ReactNode } from "react";

interface Pros {
	trigger: ReactNode;
}

export function ProfileDropdown({ trigger }: Pros) {
	const { logout } = useAuthStore();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={() => location.assign("/dashboard")}>
					<LayoutDashboardIcon />
					Dashboard
				</DropdownMenuItem>

				<DropdownMenuItem onClick={logout}>
					<LogOutIcon />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
