import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialog } from "@/components/providers/DialogProvider";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useTripsState, type Trip } from "@/states/useTripsState";
import { toast } from "sonner";
import type { DateRange } from "react-day-picker";

interface Props {
	trip: Trip;
}

export function ActionDropdown({ trip }: Props) {
	const { open } = useDialog();
	const { updateTrip, removeTrip } = useTripsState();

	const handleConfirm = () => {
		removeTrip(trip.id);
		toast.success("Trip removed");
	};

	const handleUpdateTrip = ({
		name,
		date,
	}: {
		name: string;
		date: DateRange;
	}) => {
		updateTrip({
			...trip,
			name,
			date,
		});
		toast.success("Trip updated");
	};

	const handleEdit = () => {
		open("EditTripDialog", {
			name: trip.name,
			date: trip.date,
			handleUpdateTrip,
		});
	};

	const handleDelete = () => {
		open("AppAlertDialog", {
			title: "Are you sure you want to remove this trip?",
			handleConfirm,
		});
	};

	const handleClick =
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
		(callBack: () => void) => {
			e.stopPropagation();
			callBack();
		};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Ellipsis />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={(e) => handleClick(e)(handleEdit)}>
					<Pencil />
					Edit
				</DropdownMenuItem>

				<DropdownMenuItem
					className="text-red-600"
					onClick={(e) => handleClick(e)(handleDelete)}
				>
					<Trash2 />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
