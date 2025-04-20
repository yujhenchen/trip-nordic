import type { Trip, TripActivity, TripDay } from "@/types/trips";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const defaultTrip: Trip = {
	id: "new-trip",
	name: "New Trip",
	date: { from: new Date(), to: new Date() },
	tripDays: [],
};

interface TripsState {
	// trip
	trips: Array<Trip>;
	actions: {
		addTrip: (trip: Trip) => void;
		// getTrip: (tripId: string) => Trip | null;
		updateTrip: (trip: Trip) => void;
		// updateTripName: (tripId: string, name: string) => void;
		// updateTripDate: (tripId: string, date: DateRange) => void;
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
	};
}

const useTripsState = create<TripsState>()(
	persist(
		(set) => ({
			trips: [],
			actions: {
				addTrip: (trip) => set((state) => ({ trips: [...state.trips, trip] })),
				updateTrip: (trip) =>
					set((state) => ({
						trips: state.trips.map((t) => (t.id === trip.id ? trip : t)),
					})),
				// updateTripName: (tripId, name) =>
				// 	set((state) => ({
				// 		trips: state.trips.map((t) => (t.id === tripId ? { ...t, name } : t)),
				// 	})),
				// updateTripDate: (tripId, date) =>
				// 	set((state) => ({
				// 		trips: state.trips.map((t) => (t.id === tripId ? { ...t, date } : t)),
				// 	})),
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
											tripDays: t.tripDays.filter(
												(day) => day.id !== tripDayId,
											),
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
													? {
															...day,
															activities: [...day.activities, activity],
														}
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
			},
		}),
		{
			name: "trips-storage",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ trips: state.trips }),
		},
	),
);

export const useTrips = () => useTripsState((state) => state.trips);
export const useTripsActions = () => useTripsState((state) => state.actions);
