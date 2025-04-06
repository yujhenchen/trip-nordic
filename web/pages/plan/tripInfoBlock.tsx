import type { DateRange } from "react-day-picker";
import { EditableHeading3 } from "./editableHeading3";
import { DatePickerWithRange } from "@/components/common/datePickerWithRange";
import useTripState, { type Trip } from "@/states/useTripState";

interface Props {
	trip: Trip;
}

export function TripInfoBlock({ trip }: Props) {
	return (
		<>
			<TripName tripId={trip.id} />
			<TripDate tripId={trip.id} />
		</>
	);
}

function TripName({ tripId }: { tripId: string }) {
	const { trips, updateTripName } = useTripState();
	const currentName = trips.find((trip) => trip.id === tripId)?.name ?? "";

	const handleSave = (value: string) => {
		updateTripName(tripId, value);
	};

	return <EditableHeading3 text={currentName} handleSave={handleSave} />;
}

function TripDate({ tripId }: { tripId: string }) {
	const { trips, updateTripDate } = useTripState();
	const currentDateRange = trips.find((trip) => trip.id === tripId)?.date ?? {
		from: new Date(),
		to: new Date(),
	};

	const handleSetDate = (date: DateRange | undefined) => {
		updateTripDate(tripId, date ?? { from: new Date(), to: new Date() });
	};

	return (
		<DatePickerWithRange date={currentDateRange} setDate={handleSetDate} />
	);
}
