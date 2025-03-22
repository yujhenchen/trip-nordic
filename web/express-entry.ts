import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import { createDevMiddleware, renderPage } from "vike/server";
import dotenv from "dotenv";
import type { Request } from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;

const protocol = process.env.PROTOCOL ?? "http";
const domain = process.env.DOMAIN ?? "localhost";
const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

const VERIFYING_KEY = (process.env.VERIFYING_KEY ?? "").replace(/\\n/g, "\n");

interface AppRequest extends Request {
	user?: Record<string, unknown>;
}

export default (await startServer()) as unknown;

const getUser = (request: AppRequest): string | null => {
	const cookies = request.cookies;

	const accessToken = cookies.access;
	if (!accessToken) {
		return null;
	}

	let user: string | null = null;
	if (accessToken) {
		try {
			const decoded = jwt.verify(accessToken, VERIFYING_KEY);
			if (typeof decoded === "object" && "user_id" in decoded) {
				user = decoded.user_id;
			}
		} catch (error) {
			console.error(error);
		}
	}
	return user;
};

async function startServer() {
	const app = express();

	if (process.env.NODE_ENV === "production") {
		app.use(express.static(`${root}/dist/client`));
	} else {
		// Instantiate Vite's development server and integrate its middleware to our server.
		// ⚠️ We should instantiate it *only* in development. (It isn't needed in production
		// and would unnecessarily bloat our server in production.)
		const { devMiddleware } = await createDevMiddleware({ root });
		app.use(devMiddleware);
	}

	/**
	 * Vike route
	 *
	 * @link {@see https://vike.dev}
	 **/

	app.use(cookieParser());

	app.all("*", async (req: AppRequest, res) => {
		const user = getUser(req);

		const pageContextInit = {
			// Required: the URL of the page
			urlOriginal: req.originalUrl,

			// Optional: the HTTP Headers
			headersOriginal: req.headers,

			// Optional: information about the logged-in user (when using an
			// Express.js authentication middleware that defines `req.user`).
			user, //"TODO: fix this to correct value",

			// ... we can provide any additional information about the request here ...
		};

		const pageContext = await renderPage(pageContextInit);

		const { body, statusCode, headers } = pageContext.httpResponse;
		for (const [name, value] of headers) {
			res.setHeader(name, value);
		}
		res.status(statusCode).send(body);
	});

	app.listen(port, () => {
		console.log(`Server listening on ${protocol}://${domain}:${port}`);
	});

	return app;
}
