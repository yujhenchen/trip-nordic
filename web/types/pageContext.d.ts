import type { PageContextServer } from "vike/types";

export interface AppPageContext extends PageContextServer {
	user: string | null;
}

export type PageContextUserType = AppPageContext["user"];
