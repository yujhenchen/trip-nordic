import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/useLogout";
import { LayoutDashboardIcon, LogOutIcon } from "lucide-react";
import type { ReactNode } from "react";
import { LoadingOverlay } from "./loadingOverlay";
import { navigate } from "vike/client/router";

interface Pros {
	trigger: ReactNode;
}

export function ProfileDropdown({ trigger }: Pros) {
	const { logout, isLoading } = useLogout();

	if (isLoading) {
		return <LoadingOverlay />;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={() => navigate("/dashboard")}>
					<LayoutDashboardIcon />
					Dashboard
				</DropdownMenuItem>

				<DropdownMenuItem onClick={() => logout()}>
					<LogOutIcon />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
