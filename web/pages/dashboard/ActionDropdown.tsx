import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialog } from "@/components/providers/DialogProvider";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import useTripState, { type Trip } from "@/states/useTripState";
import { toast } from "sonner";
import type { DateRange } from "react-day-picker";

interface Props {
	trip: Trip;
}

export function ActionDropdown({ trip }: Props) {
	const { open } = useDialog();
	const { updateTrip, removeTrip } = useTripState();

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
			startDate: date.from ?? trip.startDate,
			endDate: date.to ?? trip.endDate,
		});
		toast.success("Trip updated");
	};

	const handleEdit = () => {
		open("EditTripDialog", {
			name: trip.name,
			date: {
				from: trip.startDate,
				to: trip.endDate,
			},
			handleUpdateTrip,
		});
	};

	const handleDelete = () => {
		open("AppAlertDialog", {
			title: "Are you sure you want to remove this trip?",
			handleConfirm,
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Ellipsis />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={handleEdit}>
					<Pencil />
					Edit
				</DropdownMenuItem>

				<DropdownMenuItem className="text-red-600" onClick={handleDelete}>
					<Trash2 />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
