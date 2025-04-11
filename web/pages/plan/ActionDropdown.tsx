import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialog } from "@/components/providers/DialogProvider";
import { Ellipsis, Trash2 } from "lucide-react";

interface Props {
	handleConfirm: () => void;
}

export function ActionDropdown({ handleConfirm }: Props) {
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
					className="text-red-600"
					onClick={() =>
						open("AppAlertDialog", {
							title: "Are you sure you want to remove this list?",
							handleConfirm,
						})
					}
				>
					<Trash2 />
					Remove Day
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
