// import { getUser } from "@/apis";
import type { Request, Response } from "express";
import { renderPage } from "vike/server";
// import { getUser } from "./apis"; // TODO: this if for be
import dotenv from "dotenv";

export interface AppRequest extends Request {
	user?: Record<string, unknown>;
}

// dotenv.config();
// const apiUrl = process.env.VITE_AUTH_API_URL;

// export const user = async () => {
// 	const userUrl = `${apiUrl}/user`;
// 	const response = await fetch(userUrl, {
// 		method: "GET",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		credentials: "include",
// 	});
// 	console.log(response);

// 	if (!response.ok) {
// 		throw new Error(response.statusText);
// 	}
// 	return await response.json();
// }

// export const getUser = async (): Promise<Record<string, unknown> | null> => {
// 	try {
// 		return await user();
// 	} catch (error) {
// 		console.error(error);
// 		return null;
// 	}
// }

// export const handlePageRequest = async (req: AppRequest, res: Response) => {

// 	console.log("handlePageRequest", req.url)
// 	const user = await getUser();
// 	console.log("user", user)

// 	const pageContextInit = {
// 		// Required: the URL of the page
// 		urlOriginal: req.originalUrl,

// 		// Optional: the HTTP Headers
// 		headersOriginal: req.headers,

// 		// Optional: information about the logged-in user (when using an
// 		// Express.js authentication middleware that defines `req.user`).
// 		user: user?.user_id, // "TODO: fix this to correct value"
// 	};

// 	const pageContext = await renderPage(pageContextInit);

// 	const { body, statusCode, headers } = pageContext.httpResponse;
// 	for (const [name, value] of headers) {
// 		res.setHeader(name, value);
// 	}
// 	res.status(statusCode).send(body);
// };
