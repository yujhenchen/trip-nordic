import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import { createDevMiddleware, renderPage } from "vike/server";
import dotenv from "dotenv";
// import type { Request, Response } from "express";
import cookieParser from "cookie-parser";
// import { getUser } from "./apis";
import type { AppRequest } from "./pageHandler";

import * as jose from "jose";
// import { getTokens } from "./apis";

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

	// app.get("/login", handlePageRequest);
	// app.get("/signup", handlePageRequest);
	// app.get("*", handlePageRequest);


	app.all("*", async (req: AppRequest, res) => {
		// const user = getUser(req);
		console.log("req.url", req.url)

		// TODO: 
		// check if token is about to expired, call refresh if so
		// get user from cookie
		const apiUrl = process.env.VITE_AUTH_API_URL ?? '';
		const getTokens = async (refresh: string) => {
			const refreshUrl = `${apiUrl}/refresh`;
			const response = await fetch(refreshUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					refresh,
				}),
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return await response.json();
		};



		const accessTokenKey = process.env.ACCESS_TOKEN_COOKIE_NAME ?? 'access';
		const accessToken = req.cookies[accessTokenKey];

		const refreshTokenKey = process.env.REFRESH_TOKEN_COOKIE_NAME ?? 'refresh';
		const refreshToken = req.cookies[refreshTokenKey];
		console.log("accessToken", accessToken)
		if (accessToken) {
			const alg = 'RS256';
			const spki = process.env.VERIFYING_KEY?.replace(/\\n/g, '\n') ?? '';
			const publicKey = await jose.importSPKI(spki, alg)

			try {
				const { payload } = await jose.jwtVerify(accessToken, publicKey);
				const exp = payload.exp as number;
				const currentTime = Math.floor(Date.now() / 1000);
				console.log("exp", exp)
				console.log("currentTime", currentTime)
				console.log("exp - currentTime", exp - currentTime)

				if (exp - currentTime < 290) {
					try {
						await getTokens(refreshToken);
					} catch (error) {
						console.error(error);
					}
				}
			} catch (error) {
				try {
					// TODO; when access token has already expired
					console.log("do something")
				} catch (error) {
					console.error("client", error);
				}
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
