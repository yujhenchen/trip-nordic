import { ClipboardCopy, Save } from "lucide-react";
import { IconButton } from "@/components/common/iconButton";
import { toast } from "sonner";
import { useTripsState } from "@/states/useTripsState";
import { navigate } from "vike/client/router";
import { EditableHeading3 } from "@/components/common/editableHeading3";
import { DatePickerWithRange } from "@/components/common/datePickerWithRange";
import { useTripState } from "@/states/useTripState";
import type { Trip } from "@/types/trips";
import type { AppDateRange } from "@/types/shared";

interface Props {
	trip: Trip | null;
}

export function ControlPanel({ trip }: Props) {
	const {
		name: tripName,
		date: tripDate,
		tripDays,
		setName: setTripName,
		setDate: setTripDate,
	} = useTripState();

	const { addTrip } = useTripsState();

	const { updateTrip } = useTripsState();

	const handleSaveName = (value: string) => {
		setTripName(value);
	};

	const handleSelectDate = (dateRange: AppDateRange) => {
		setTripDate(dateRange);
	};

	const handleSave = () => {
		if (trip) {
			updateTrip({
				...trip,
				name: tripName,
				date: tripDate,
			});
		} else {
			const newTrip = {
				id: crypto.randomUUID(),
				name: tripName,
				date: tripDate,
				tripDays,
			};
			addTrip(newTrip);
			navigate(`/plan/${newTrip.id}`);
		}
		toast.success("Saved");
	};

	const displayTripName = trip
		? trip.name !== tripName
			? tripName
			: trip.name
		: tripName;

	const displayTripDate = trip
		? JSON.stringify(trip.date) !== JSON.stringify(tripDate)
			? tripDate
			: trip.date
		: tripDate;

	return (
		<div className="w-full h-16 place-content-between flex border px-8 py-1 items-center">
			<EditableHeading3 text={displayTripName} handleSave={handleSaveName} />
			<DatePickerWithRange
				date={displayTripDate}
				onSelectDate={(range, _selectedDay, _activeModifiers, _e) => {
					if (range?.from && range.to) {
						handleSelectDate({
							from: range.from,
							to: range.to,
						});
					}
				}}
			/>
			<div className="flex space-x-6">
				<IconButton icon={<Save />} onClick={handleSave} />
				<IconButton
					icon={<ClipboardCopy />}
					onClick={() => toast.success("Copied")}
				/>
			</div>
		</div>
	);
}
