import type { Request } from "express";

export interface AppRequest extends Request {
	user?: Record<string, unknown>;
}
