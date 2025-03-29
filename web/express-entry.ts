import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import { createDevMiddleware, renderPage } from "vike/server";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import type { AppRequest } from "./pageHandler";

import {
	clearAuthCookies,
	getPayload,
	handleTokenRefresh,
} from "./utils/authHelper";
import { JWTExpired } from "jose/errors";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;

const protocol = process.env.PROTOCOL ?? "http";
const domain = process.env.DOMAIN ?? "localhost";
const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

const apiUrl = process.env.VITE_AUTH_API_URL ?? "";

const accessTokenKey = process.env.ACCESS_TOKEN_COOKIE_NAME ?? "access";
const refreshTokenKey = process.env.REFRESH_TOKEN_COOKIE_NAME ?? "refresh";

const verifyingKey = process.env.VERIFYING_KEY?.replace(/\\n/g, "\n") ?? "";

const TOKEN_EXPIRED_THRESHOLD = Number(
	process.env.TOKEN_EXPIRED_THRESHOLD ?? 60,
);

export default (await startServer()) as unknown;

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

	app.all("*", async (req: AppRequest, res, next) => {
		const accessToken = req.cookies[accessTokenKey];
		const refreshToken = req.cookies[refreshTokenKey];

		if (accessToken) {
			try {
				const payload = await getPayload(accessToken, verifyingKey);
				const exp = payload?.exp as number;
				const currentTime = Math.floor(Date.now() / 1000);

				if (exp - currentTime < TOKEN_EXPIRED_THRESHOLD) {
					// console.log("refresh token");
					await handleTokenRefresh(
						apiUrl,
						refreshToken,
						res,
						accessTokenKey,
						refreshTokenKey,
					);
				}
			} catch (error) {
				if (error instanceof JWTExpired) {
					// console.error("middleware JWTExpired:", error);
					await handleTokenRefresh(
						apiUrl,
						refreshToken,
						res,
						accessTokenKey,
						refreshTokenKey,
					);
				} else {
					console.error("middleware: silent authentication:", error);
					clearAuthCookies(res, accessTokenKey, refreshTokenKey);
				}
			}
		}

		next();
	});

	app.all("*", async (req, res) => {
		// TODO: get user from token
		const accessToken = req.cookies[accessTokenKey];
		let user: string | null = null;
		try {
			const payload = await getPayload(accessToken, verifyingKey);
			user = (payload?.user_id as string) ?? null;
		} catch (error) {
			console.error("middleware: get user:", error);
		}

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
