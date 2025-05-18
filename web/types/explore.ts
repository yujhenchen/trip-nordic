export interface Activity {
	id: string;
	categories: Array<string>;
	city: string;
	description: string;
	name: string;
	region: string;
	seasons: Array<string>;
	img?: {
		src: string;
		alt: string;
	};
}

export interface FiActivities {
	totalItemsCount: number;
	items: Array<Activity>;
}

export interface GQLFiActivityResponse {
	fiActivities: FiActivities;
}

export interface GQLFilterData {
	name: FilterKeyType;
	items: Array<string>;
}

export interface GQLFilterResponse {
	fiActivityFilters: Array<GQLFilterData>;
}

export interface ActivityFilters {
	cities?: Array<string>;
	regions?: Array<string>;
	categories?: Array<string>;
	seasons?: Array<string>;
}

export interface ActivityQueryParams {
	keyword: string;
	filters: ActivityFilters;
	limit: number;
	offset: number;
	orderBy: string;
}

export type FilterKeyType = keyof ActivityFilters;
