import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type WithIdType = {
	id: string;
};

// store keep ids
interface State<T extends WithIdType> {
	keeps: Array<T>;
	actions: {
		addKeep: (item: T) => void;
		unKeep: (id: string) => void;
	};
}

export const createKeepStore = <T extends WithIdType>(
	storeNamePrefix: string,
) =>
	create<State<T>>()(
		persist(
			(set) => ({
				keeps: [],
				actions: {
					addKeep: (item) =>
						set((state) => ({
							keeps: state.keeps.find((keep) => keep.id === item.id)
								? state.keeps
								: [...state.keeps, item],
						})),
					unKeep: (id) =>
						set((state) => ({
							keeps: state.keeps.filter((k) => k.id !== id),
						})),
				},
			}),
			{
				name: `${storeNamePrefix}-keeps`,
				storage: createJSONStorage(() => localStorage),
				partialize: (state) => ({
					keeps: state.keeps,
				}),
			},
		),
	);
