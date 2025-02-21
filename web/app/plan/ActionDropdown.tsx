"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialog } from "@/components/providers/DialogProvider";
import { Ellipsis } from "lucide-react";

export function ActionDropdown() {
	const { open } = useDialog();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Ellipsis />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() =>
						open("AppAlertDialog", {
							title: "Are you sure you want to remove this list?",
						})
					}
				>
					Remove List
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
