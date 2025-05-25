export interface AppDateRange {
	from: Date;
	to: Date;
}

export const PAGE_KEYS = {
	ABOUT: "/about",
	DASHBOARD: "/dashboard",
	EXPLORE: "/explore",
	HOME: "/",
	LOGIN: "/login",
	SIGNUP: "/signup",
	PLAN: "/plan",
} as const;

export type PageType = (typeof PAGE_KEYS)[keyof typeof PAGE_KEYS];
