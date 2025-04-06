import type { DateRange } from "react-day-picker";
import { EditableHeading3 } from "./editableHeading3";
import { DatePickerWithRange } from "@/components/common/datePickerWithRange";
import { useState } from "react";
import useTripState, { Trip } from "@/states/useTripState";

interface Props {
	trip: Trip;
}

export function TripInfoBlock({ trip }: Props) {
	return (
		<>
			<TripName id={trip.id} name={trip.name} />
			<TripDate id={trip.id} date={trip.date} />
		</>
	);
}

function TripName({ id, name }: { id: string; name: string }) {
	const { trips, updateTripName } = useTripState();
	const currentName = trips.find((trip) => trip.id === id)?.name ?? "";

	const handleSave = (value: string) => {
		updateTripName(id, value);
	};

	return <EditableHeading3 text={currentName} handleSave={handleSave} />;
}

function TripDate({ id, date }: { id: string; date: DateRange | undefined }) {
	const { trips, updateTripDate } = useTripState();
	const currentDateRange = trips.find((trip) => trip.id === id)?.date ?? {
		from: new Date(),
		to: new Date(),
	};

	const handleSetDate = (date: DateRange | undefined) => {
		updateTripDate(id, date ?? { from: new Date(), to: new Date() });
	};

	return (
		<DatePickerWithRange date={currentDateRange} setDate={handleSetDate} />
	);
}
