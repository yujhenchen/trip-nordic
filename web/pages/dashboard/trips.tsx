import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useTripState from "@/states/useTripState";
import { NewTripCard } from "./newTripCard";
import { ActionDropdown } from "./ActionDropdown";

const getDateString = (date: string | Date | unknown) => {
	if (typeof date === "string") {
		return new Date(date).toDateString();
	}
	if (date instanceof Date) {
		return date.toDateString();
	}
	return JSON.stringify(date);
};

export function Trips() {
	const { trips } = useTripState();

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
			{trips.map((trip) => (
				<Card key={trip.id}>
					<CardHeader>
						<div className="w-full flex place-content-end">
							<ActionDropdown />
						</div>
						<CardTitle>{trip.name}</CardTitle>
						<CardDescription className="flex space-x-2">
							<Label>{getDateString(trip.startDate)}</Label>
							<Label>-</Label>
							<Label>{getDateString(trip.endDate)}</Label>
						</CardDescription>
					</CardHeader>
				</Card>
			))}
			<NewTripCard />
		</div>
	);
}
