import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// store keep ids
interface KeepState {
	keeps: Array<string>;
	addKeep: (keep: string) => void;
	removeKeep: (keep: string) => void;
}

export const useKeepStore = create<KeepState>()(
	persist(
		(set) => ({
			keeps: [],
			addKeep: (keep) => set((state) => ({ keeps: [...state.keeps, keep] })),
			removeKeep: (keep) =>
				set((state) => ({
					keeps: state.keeps.filter((k) => k !== keep),
				})),
		}),
		{
			name: "keeps",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
