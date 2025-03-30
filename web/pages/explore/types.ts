export const FilterKeyTitle = {
	city: "Cities",
	category: "Categories",
	country: "Countries",
	region: "Region",
	season: "Seasons",
} as const;

export type FilterKeyType = keyof typeof FilterKeyTitle;

export type FiltersType = Partial<Record<FilterKeyType, Array<string>>>;

export interface Activity {
	id: string;
	category: string;
	city: string;
	description: string;
	name: string;
	region: string;
	seasons: string;
	img?: {
		src: string;
		alt: string;
	};
}
