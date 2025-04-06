import { DateRange } from "react-day-picker";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Trip {
	id: string;
	name: string;
	date: DateRange;
	tripDays: Array<TripDay>;
}

interface TripDay {
	id: string;
	date: Date;
	activities: Array<TripActivity>;
}

interface TripActivity {
	id: string;
	name: string;
	description: string;
}

interface TripState {
	// trip
	trips: Array<Trip>;
	addTrip: (trip: Trip) => void;
	// getTrip: (tripId: string) => Trip | null;
	updateTrip: (trip: Trip) => void;
	removeTrip: (tripId: string) => void;
	// trip date
	addDay: (tripId: string, tripDay: TripDay) => void;
	// getDays: (tripId: string) => Array<TripDay>;
	// getDay: (tripId: string, tripDayId: string) => TripDay | null;
	updateDay: (tripId: string, tripDay: TripDay) => void;
	removeDay: (tripId: string, tripDayId: string) => void;
	// trip activities
	addActivity: (
		tripId: string,
		tripDayId: string,
		activity: TripActivity,
	) => void;
	// getActivity: (tripId: string, tripDayId: string, activityId: string) => TripActivity | null;
	// getActivities: (tripId: string, tripDayId: string) => Array<TripActivity>;
	updateActivity: (
		tripId: string,
		tripDayId: string,
		activity: TripActivity,
	) => void;
	removeActivity: (
		tripId: string,
		tripDayId: string,
		activityId: string,
	) => void;
}

const useTripState = create<TripState>()(
	persist(
		(set) => ({
			trips: [],
			addTrip: (trip) => set((state) => ({ trips: [...state.trips, trip] })),
			updateTrip: (trip) =>
				set((state) => ({
					trips: state.trips.map((t) => (t.id === trip.id ? trip : t)),
				})),
			removeTrip: (tripId) =>
				set((state) => ({
					trips: state.trips.filter((t) => t.id !== tripId),
				})),
			// trip day
			addDay: (tripId, tripDay) =>
				set((state) => ({
					trips: [
						...state.trips.map((t) =>
							t.id === tripId
								? { ...t, tripDays: [...t.tripDays, tripDay] }
								: t,
						),
					],
				})),
			updateDay: (tripId, tripDay) =>
				set((state) => ({
					trips: [
						...state.trips.map((t) =>
							t.id === tripId
								? {
									...t,
									tripDays: t.tripDays.map((day) =>
										day.id === tripDay.id ? tripDay : day,
									),
								}
								: t,
						),
					],
				})),
			removeDay: (tripId, tripDayId) =>
				set((state) => ({
					trips: [
						...state.trips.map((t) =>
							t.id === tripId
								? {
									...t,
									tripDays: t.tripDays.filter((day) => day.id !== tripDayId),
								}
								: t,
						),
					],
				})),
			// trip activity
			addActivity: (tripId, tripDayId, activity) =>
				set((state) => ({
					trips: [
						...state.trips.map((t) =>
							t.id === tripId
								? {
									...t,
									tripDays: t.tripDays.map((day) =>
										day.id === tripDayId
											? { ...day, activities: [...day.activities, activity] }
											: day,
									),
								}
								: t,
						),
					],
				})),
			updateActivity: (tripId, tripDayId, activity) =>
				set((state) => ({
					trips: [
						...state.trips.map((t) =>
							t.id === tripId
								? {
									...t,
									tripDays: t.tripDays.map((day) =>
										day.id === tripDayId
											? {
												...day,
												activities: day.activities.map((a) =>
													a.id === activity.id ? activity : a,
												),
											}
											: day,
									),
								}
								: t,
						),
					],
				})),
			removeActivity: (tripId, tripDayId, activityId) =>
				set((state) => ({
					trips: [
						...state.trips.map((t) =>
							t.id === tripId
								? {
									...t,
									tripDays: t.tripDays.map((day) =>
										day.id === tripDayId
											? {
												...day,
												activities: day.activities.filter(
													(a) => a.id !== activityId,
												),
											}
											: day,
									),
								}
								: t,
						),
					],
				})),
		}),
		{
			name: "trips",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useTripState;
