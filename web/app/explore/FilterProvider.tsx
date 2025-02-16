"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { FilterOptionType, FiltersType } from "./types";

type FilterProviderProps = {
	children: React.ReactNode;
	filters: FiltersType;
};

type FilterProviderState = {
	filters: FiltersType;
	toggleFilterOption: (key: string, option: FilterOptionType) => void;
	resetFilterSelectedOptions: (key: string) => void;
	resetAllFilterSelected: () => void;
};

const initialState: FilterProviderState = {
	filters: {},
	toggleFilterOption: () => {},
	resetFilterSelectedOptions: () => {},
	resetAllFilterSelected: () => {},
};

const FilterProviderContext = createContext<FilterProviderState>(initialState);

export function FilterProvider({
	children,
	filters,
	...props
}: FilterProviderProps) {
	const [providerFilters, setProviderFilters] = useState(filters);

	const toggleFilterOption = useCallback(
		(key: string, option: FilterOptionType) => {
			setProviderFilters((preFilters) => {
				const newFilters = { ...preFilters };
				const foundOptions = preFilters[key];
				if (foundOptions) {
					const newOptions = foundOptions.map((o) =>
						o.value === option.value ? { ...o, isSelected: !o.isSelected } : o,
					);
					newFilters[key] = newOptions;
				}
				return newFilters;
			});
		},
		[],
	);

	const resetFilterSelectedOptions = useCallback((key: string) => {
		setProviderFilters((preFilters) => {
			const newFilters = { ...preFilters };
			const foundOptions = preFilters[key];
			if (foundOptions) {
				const newOptions = foundOptions.map((o) => ({
					...o,
					isSelected: false,
				}));
				newFilters[key] = newOptions;
			}
			return newFilters;
		});
	}, []);

	const resetAllFilterSelected = useCallback(() => {
		setProviderFilters((preFilters) => {
			const newFilters = { ...preFilters };
			for (const key in preFilters) {
				const foundOptions = preFilters[key];
				if (foundOptions) {
					const newOptions = foundOptions.map((o) => ({
						...o,
						isSelected: false,
					}));
					newFilters[key] = newOptions;
				}
			}
			return newFilters;
		});
	}, []);

	return (
		<FilterProviderContext.Provider
			{...props}
			value={{
				filters: providerFilters,
				resetFilterSelectedOptions,
				toggleFilterOption,
				resetAllFilterSelected,
			}}
		>
			{children}
		</FilterProviderContext.Provider>
	);
}

export function useFilterProvider() {
	const context = useContext(FilterProviderContext);
	return context;
}
