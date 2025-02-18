"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { FilterKeyType, FiltersType } from "./types";

type FilterProviderProps = {
	children: React.ReactNode;
	filters: FiltersType;
};

type FilterProviderState = {
	filters: FiltersType;
	currentFilters: FiltersType;
	toggleFilterOption: (filterKey: FilterKeyType, option: string) => void;
	resetFilterSelectedOptions: (filterKey: FilterKeyType) => void;
	resetAllFilterSelected: () => void;
};

const initialState: FilterProviderState = {
	filters: {},
	currentFilters: {},
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
	const [currentFilters, setCurrentFilters] = useState({} as FiltersType);

	const toggleFilterOption = useCallback(
		(filterKey: FilterKeyType, option: string) => {
			setCurrentFilters((preFilters) => {
				const newFilters = { ...preFilters };
				const options = newFilters[filterKey];
				if (options) {
					newFilters[filterKey] = options.includes(option)
						? options.filter((o) => o !== option)
						: [...options, option];
				} else {
					newFilters[filterKey] = [option];
				}
				return newFilters;
			});
		},
		[]
	);

	const resetFilterSelectedOptions = useCallback(
		(filterKey: FilterKeyType) => {
			setCurrentFilters((preFilters) => {
				const newFilters = { ...preFilters };
				newFilters[filterKey] = [];
				return newFilters;
			});
		},
		[]
	);

	const resetAllFilterSelected = useCallback(() => {
		setCurrentFilters({});
	}, []);

	return (
		<FilterProviderContext.Provider
			{...props}
			value={{
				filters,
				currentFilters,
				resetFilterSelectedOptions,
				toggleFilterOption,
				resetAllFilterSelected,
			}}
		>
			{children}
		</FilterProviderContext.Provider>
	);
}

export function useFilters() {
	const context = useContext(FilterProviderContext);
	return context;
}
