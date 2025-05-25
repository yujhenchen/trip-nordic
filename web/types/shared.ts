type ValueOf<T> = T[keyof T];

export interface AppDateRange {
	from: Date;
	to: Date;
}

export const ROUTE_PATHS = {
	ABOUT: "/about",
	DASHBOARD: "/dashboard",
	EXPLORE: "/explore",
	HOME: "/",
	LOGIN: "/login",
	SIGNUP: "/signup",
	PLAN: "/plan",
} as const;

export type RoutePath = ValueOf<typeof ROUTE_PATHS>;
