export type FilterOptionType = {
	isSelected: boolean;
	value: string;
};

export const FilterKeyTitle = {
	city: "Cities",
	category: "Categories",
	country: "Countries",
	region: "Region",
	season: "Seasons",
} as const;

export type FilterKeyType = keyof typeof FilterKeyTitle;

export type FiltersType = Record<FilterKeyType, Array<FilterOptionType>>;
