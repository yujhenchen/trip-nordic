import type { AppDateRange } from "./shared";

export interface Trip {
	id: string;
	name: string;
	date: AppDateRange;
	tripDays: Array<TripDay>;
}

export interface TripDay {
	id: string;
	date: Date;
	activities: Array<TripActivity>;
}

export interface TripActivity {
	id: string;
	name: string;
	content: string;
}

export type NewTrip = Pick<Trip, "name" | "date">;
