import { ClipboardCopy, Save } from "lucide-react";
import { IconButton } from "@/components/common/iconButton";
import { toast } from "sonner";
import { useTripsState } from "@/states/useTripsState";
import { navigate } from "vike/client/router";
import { EditableHeading3 } from "@/components/common/editableHeading3";
import { DatePickerWithRange } from "@/components/common/datePickerWithRange";
import type { Trip } from "@/types/trips";
import type { AppDateRange } from "@/types/shared";
import { useTrip } from "./TripContext";

interface Props {
	trip: Trip | null;
}

export function ControlPanel({ trip }: Props) {
	const { state, dispatch } = useTrip();

	const { addTrip } = useTripsState();

	const { updateTrip } = useTripsState();

	const handleSaveName = (value: string) => {
		dispatch({ type: "setName", name: value });
	};

	const handleSelectDate = (dateRange: AppDateRange) => {
		dispatch({ type: "setDate", date: dateRange });
	};

	const handleSave = () => {
		if (trip) {
			updateTrip({
				...trip,
				name: state.name,
				date: state.date,
			});
		} else {
			const newTrip = {
				id: crypto.randomUUID(),
				name: state.name,
				date: state.date,
				tripDays: state.tripDays,
			};
			addTrip(newTrip);
			navigate(`/plan/${newTrip.id}`);
		}
		toast.success("Saved");
	};

	return (
		<div className="w-full h-16 place-content-between flex border px-8 py-1 items-center">
			<EditableHeading3 text={state.name} handleSave={handleSaveName} />
			<DatePickerWithRange
				date={state.date}
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
