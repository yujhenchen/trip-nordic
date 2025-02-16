"use client";

import { createContext, useContext, useState } from "react";

export interface FilterOptionData {
	isSelected: boolean;
	value: string;
}

export type FilterOptionsType = Array<FilterOptionData>;

export interface FilterData {
	title: string;
	options: FilterOptionsType;
}

export type FiltersType = Array<FilterData>;

export type UpdateFiltersFn = (
	title: string,
	filters: FilterOptionsType,
) => void;

type FilterProviderProps = {
	children: React.ReactNode;
	filters: FiltersType;
};

type FilterProviderState = {
	filters: FiltersType;
	updateFilters: UpdateFiltersFn;
};

const initialState: FilterProviderState = {
	filters: [],
	updateFilters: () => {},
};

const FilterProviderContext = createContext<FilterProviderState>(initialState);

export function FilterProvider({
	children,
	filters,
	...props
}: FilterProviderProps) {
	const [providerFilters, setProviderFilters] = useState(filters);
	const updateFilters: UpdateFiltersFn = (
		title: string,
		newOptions: FilterOptionsType,
	) => {
		document.startViewTransition(() => {
			setProviderFilters((preFilters) => {
				const newFilters = [...preFilters];
				const found = newFilters.find((f) => f.title === title);
				if (found) {
					found.options = newOptions;
				}
				return newFilters;
			});
		});
	};

	return (
		<FilterProviderContext.Provider
			{...props}
			value={{ filters: providerFilters, updateFilters }}
		>
			{children}
		</FilterProviderContext.Provider>
	);
}

export function useFilterProvider() {
	const context = useContext(FilterProviderContext);
	return context;
}
