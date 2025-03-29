// import { getUser } from "@/apis";
import type { Request, Response } from "express";
import { renderPage } from "vike/server";
// import { getUser } from "./apis"; // TODO: this if for be
import dotenv from "dotenv";

export interface AppRequest extends Request {
	user?: Record<string, unknown>;
}
