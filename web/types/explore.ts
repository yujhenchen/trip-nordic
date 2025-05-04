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

export interface GQLActivity {
	id: string; // MongoDB ObjectId
	idinternal: string; // UUID
	accessible: boolean;
	category: string;
	city: string;
	descriptionen: string;
	languages: string;
	nameen: string;
	region: string;
	seasons: string;
}

export interface ActivityEdge {
	node: GQLActivity;
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
	activities: Array<GQLActivity>;
	pageInfo: PageInfo;
}

export interface GQLFilterData {
	name: string;
	items: string;
}

export interface GQLFilterResponse {
	filters: Array<GQLFilterData>;
}
