export const FilterKeyTitle = {
	city: "Cities",
	category: "Categories",
	country: "Countries",
	region: "Region",
	seasons: "Seasons",
} as const;

export type FilterKeyType = keyof typeof FilterKeyTitle;

export type FiltersType = Partial<Record<FilterKeyType, Array<string>>>;

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

export interface ActivityEdge {
	node: Activity;
	cursor: string;
}

export interface PageInfo {
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	startCursor?: string | null;
	endCursor?: string | null;
}

export interface ActivityData {
	totalCount: number;
	edges: Array<ActivityEdge>;
	activities: Array<Activity>;
	pageInfo: PageInfo;
}

export interface GQLFilterData {
	name: string;
	items: string;
}

export interface GQLFilterResponse {
	filters: Array<GQLFilterData>;
}
