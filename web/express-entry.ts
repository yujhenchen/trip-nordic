import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import { createDevMiddleware, renderPage } from "vike/server";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import type { AppRequest } from "./pageHandler";

import { getPayload, getPublicKey, handleTokenRefresh } from "./utils/authHelper";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;

const protocol = process.env.PROTOCOL ?? "http";
const domain = process.env.DOMAIN ?? "localhost";
const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

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

	app.all("*", async (req: AppRequest, res) => {
		const apiUrl = process.env.VITE_AUTH_API_URL ?? "";

		const accessTokenKey = process.env.ACCESS_TOKEN_COOKIE_NAME ?? "access";
		const accessToken = req.cookies[accessTokenKey];

		const refreshTokenKey = process.env.REFRESH_TOKEN_COOKIE_NAME ?? "refresh";
		const refreshToken = req.cookies[refreshTokenKey];

		if (accessToken) {
			try {
				const publicKey = await getPublicKey();
				const payload = await getPayload(accessToken, publicKey);

				const exp = payload?.exp as number;
				const currentTime = Math.floor(Date.now() / 1000);
				// console.log("exp", exp);
				// console.log("currentTime", currentTime);
				// console.log("exp - currentTime", exp - currentTime);

				if (exp - currentTime < 290) {
					// console.log("refresh token");
					await handleTokenRefresh(apiUrl, refreshToken, res, accessTokenKey, refreshTokenKey);
				}
			} catch (error) {
				console.error(error);
				await handleTokenRefresh(apiUrl, refreshToken, res, accessTokenKey, refreshTokenKey);
			}
		}

		const pageContextInit = {
			// Required: the URL of the page
			urlOriginal: req.originalUrl,

			// Optional: the HTTP Headers
			headersOriginal: req.headers,

			// Optional: information about the logged-in user (when using an
			// Express.js authentication middleware that defines `req.user`).
			user: null, //"TODO: fix this to correct value",

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
