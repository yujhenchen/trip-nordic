import type { AppDateRange } from "@/types/shared";
import type { Trip, TripActivity, TripDay } from "@/types/trips";
import { createContext, type ReactNode, useContext, useReducer } from "react";

interface Props {
	defaultTrip?: Trip;
	children: ReactNode;
}

type Action =
	| { type: "setName"; name: string }
	| { type: "setDate"; date: AppDateRange }
	| { type: "addDay"; tripDay: TripDay }
	| { type: "updateDay"; tripDay: TripDay }
	| { type: "removeDay"; tripDayId: string }
	| { type: "addActivity"; tripDayId: string; activity: TripActivity }
	| { type: "updateActivity"; tripDayId: string; activity: TripActivity }
	| { type: "removeActivity"; tripDayId: string; activityId: string };

interface TripProviderState {
	state: Trip;
	dispatch: (action: Action) => void;
}

const initialTripState: Trip = {
	id: "",
	name: "New Trip",
	date: { from: new Date(), to: new Date() },
	tripDays: [],
};

const initialTripProviderState: TripProviderState = {
	state: initialTripState,
	dispatch: () => {},
};

const TripContext = createContext<TripProviderState>(initialTripProviderState);

function reducer(state: Trip, action: Action) {
	switch (action.type) {
		case "setName":
			return { ...state, name: action.name };
		case "setDate":
			return { ...state, date: action.date };
		case "addDay":
			return { ...state, tripDays: [...state.tripDays, action.tripDay] };
		case "updateDay":
			return {
				...state,
				tripDays: state.tripDays.map((tripDay) =>
					tripDay.id === action.tripDay.id
						? { ...action.tripDay, date: action.tripDay.date }
						: tripDay,
				),
			};
		case "removeDay":
			return {
				...state,
				tripDays: state.tripDays.filter(
					(tripDay) => tripDay.id !== action.tripDayId,
				),
			};
		case "addActivity":
			return {
				...state,
				tripDays: state.tripDays.map((tripDay) =>
					tripDay.id === action.tripDayId
						? {
								...tripDay,
								activities: [...tripDay.activities, action.activity],
							}
						: tripDay,
				),
			};
		case "updateActivity":
			return {
				...state,
				tripDays: state.tripDays.map((tripDay) =>
					tripDay.id === action.tripDayId
						? {
								...tripDay,
								activities: tripDay.activities.map((activity) =>
									activity.id === action.activity.id
										? action.activity
										: activity,
								),
							}
						: tripDay,
				),
			};
		case "removeActivity":
			return {
				...state,
				tripDays: state.tripDays.map((tripDay) =>
					tripDay.id === action.tripDayId
						? {
								...tripDay,
								activities: tripDay.activities.filter(
									(activity) => activity.id !== action.activityId,
								),
							}
						: tripDay,
				),
			};
		default:
			return state;
	}
}

export function TripProvider({ defaultTrip, children }: Props) {
	const [state, dispatch] = useReducer(
		reducer,
		defaultTrip ?? initialTripState,
	);

	const value: TripProviderState = {
		state,
		dispatch,
	};

	return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export const useTrip = () => {
	const context = useContext(TripContext);

	if (context === undefined)
		throw new Error("useTrip must be used within a TripProvider");

	return context;
};
