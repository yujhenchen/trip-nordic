import { ClipboardCopy } from "lucide-react";
import { IconButton } from "@/components/common/iconButton";
import { toast } from "sonner";
import { EditableHeading3 } from "@/components/common/editableHeading3";
import { DatePickerWithRange } from "@/components/common/datePickerWithRange";
import type { Trip } from "@/types/trips";
import type { AppDateRange } from "@/types/shared";
import { defaultTrip, useTripsActions } from "@/states/useTripsState";
import { navigate } from "vike/client/router";

interface Props {
	trip: Trip | null;
}

export function ControlPanel({ trip }: Props) {
	const { updateTrip, addTrip } = useTripsActions();

	const handleSaveName = (value: string) => {
		if (trip) {
			updateTrip({
				...trip,
				name: value,
			});
		} else {
			const id = crypto.randomUUID();
			addTrip({ ...defaultTrip, id, name: value });
			navigate(`/plan/${id}`);
		}
		toast.success("Trip name updated");
	};

	const handleSelectDate = (dateRange: AppDateRange) => {
		if (trip) {
			updateTrip({
				...trip,
				date: dateRange,
			});
		} else {
			const id = crypto.randomUUID();
			addTrip({ ...defaultTrip, id, date: dateRange });
			navigate(`/plan/${id}`);
		}
		toast.success("Trip duration updated");
	};

	return (
		<div className="w-full h-16 place-content-between flex border px-8 py-1 items-center">
			<EditableHeading3
				text={trip?.name ?? defaultTrip.name}
				handleSave={handleSaveName}
			/>
			<DatePickerWithRange
				date={trip?.date ?? defaultTrip.date}
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
				<IconButton
					icon={<ClipboardCopy />}
					onClick={() => toast.success("Copied")}
				/>
			</div>
		</div>
	);
}
