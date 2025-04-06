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
import { toast } from "sonner";

export function ActionDropdown() {
	const { open } = useDialog();

	const handleConfirm = () => {
		toast.success("Trip Plan removed");
	};

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
							handleConfirm,
						})
					}
				>
					Remove List
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
