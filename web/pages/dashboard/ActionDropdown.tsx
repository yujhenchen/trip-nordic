import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialog } from "@/components/providers/DialogProvider";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import useTripState from "@/states/useTripState";
import { toast } from "sonner";

interface Props {
	tripId: string;
}

export function ActionDropdown({ tripId }: Props) {
	const { open } = useDialog();
	const { removeTrip } = useTripState();

	const handleConfirm = () => {
		removeTrip(tripId);
		toast.success("Trip removed");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Ellipsis />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={() => console.log("Open edit trip dialog")}>
					<Pencil />
					Edit
				</DropdownMenuItem>

				<DropdownMenuItem
					className="text-red-600"
					onClick={() =>
						open("AppAlertDialog", {
							title: "Are you sure you want to remove this trip?",
							handleConfirm,
						})
					}
				>
					<Trash2 />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
