import { ClipboardCopy, Save } from "lucide-react";
import { IconButton } from "@/components/common/iconButton";
import { toast } from "sonner";
import useTripsState, { type Trip } from "@/states/useTripsState";
import { navigate } from "vike/client/router";
import type { DateRange } from "react-day-picker";
import { EditableHeading3 } from "@/components/common/editableHeading3";
import { DatePickerWithRange } from "@/components/common/datePickerWithRange";
import { useState } from "react";

interface Props {
	trip: Trip | null;
}

const initialName = "New Trip";
const initialDate = { from: new Date(), to: new Date() };

export function ControlPanel({ trip }: Props) {
	const [tripName, setTripName] = useState<string>(trip?.name ?? initialName);
	const [tripDate, setTripDate] = useState<DateRange>(
		trip?.date ?? initialDate
	);

	const { addTrip } = useTripsState();

	const { updateTrip } = useTripsState();

	const handleSaveName = (value: string) => {
		setTripName(value);
	};

	const handleSelectDate = (dateRange: DateRange) => {
		if (dateRange) {
			setTripDate(dateRange);
		}
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
				tripDays: [],
			};
			addTrip(newTrip);
			navigate(`/plan/${newTrip.id}`);
		}
		toast.success("Saved");
	};

	return (
		<div className="w-full h-16 place-content-between flex border px-8 py-1 items-center">
			<EditableHeading3 text={tripName} handleSave={handleSaveName} />
			<DatePickerWithRange
				date={tripDate}
				onSelectDate={(range, _selectedDay, _activeModifiers, _e) => {
					if (!range) {
						return;
					}
					handleSelectDate(range);
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
