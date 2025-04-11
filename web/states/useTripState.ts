import { create } from "zustand";
import type { Trip, TripDay } from "@/types/trips";
import type { AppDateRange } from "@/types/shared";
import { createJSONStorage, persist } from "zustand/middleware";

const initialName = "New Trip";
const initialDate = { from: new Date(), to: new Date() };

interface State extends Trip {
	setName: (name: string) => void;
	setDate: (date: AppDateRange) => void;
	setDays: (tripDays: Array<TripDay>) => void;
}

export const useTripState = create<State>()(
	persist(
		(set) => ({
			id: "",
			name: initialName,
			date: initialDate,
			tripDays: [],
			setName: (name) => set({ name }),
			setDate: (date) => set({ date }),
			setDays: (tripDays) => set({ tripDays: tripDays }),
		}),
		{
			name: "trips",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
