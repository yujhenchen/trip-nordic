import type { AppDateRange } from "@/types/shared";
import type { Trip, TripDay } from "@/types/trips";
import { createContext, type ReactNode, useContext, useReducer } from "react";

interface Props {
	defaultTrip?: Trip;
	children: ReactNode;
}

type Action =
	| { type: "setName"; name: string }
	| { type: "setDate"; date: AppDateRange }
	| { type: "setDays"; tripDays: Array<TripDay> };

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
		case "setDays":
			return { ...state, tripDays: action.tripDays };
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
