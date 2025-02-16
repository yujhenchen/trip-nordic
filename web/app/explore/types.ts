export type FilterOptionType = {
	isSelected: boolean;
	value: string;
};

export type FiltersType = Record<string, Array<FilterOptionType>>;
