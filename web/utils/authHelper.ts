import type { Response } from "express";

import * as jose from "jose";

export const getTokens = async (apiUrl: string, refresh: string) => {
	const refreshUrl = `${apiUrl}/token/refresh`;
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
	return response;
};

export const clearAuthCookies = (res: Response, accessTokenKey: string, refreshTokenKey: string) => {
	res
		.clearCookie(accessTokenKey, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			path: "/",
		})
		.clearCookie(refreshTokenKey, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			path: "/",
		});
};

export async function handleTokenRefresh(
	apiUrl: string,
	refresh: string,
	res: Response,
	accessTokenKey: string,
	refreshTokenKey: string,
): Promise<void> {
	try {
		const response = await getTokens(apiUrl, refresh);
		const data = await response.json();
		// console.log("data", data);

		const accessToken = data.access;
		const refreshToken = data.refresh;

		res
			.cookie("access", accessToken, {
				httpOnly: true,
				secure: true,
				sameSite: "strict",
				path: "/",
			})
			.cookie("refresh", refreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: "strict",
				path: "/",
			});
	} catch (error) {
		console.error("handleTokenRefresh", error);
		clearAuthCookies(res, accessTokenKey, refreshTokenKey);
	}
}

export const getPayload = async (
	access: string,
	verifyingKey: string,
): Promise<jose.JWTPayload | null> => {
	const alg = "RS256";
	const spki = verifyingKey.replace(/\\n/g, "\n") ?? "";
	const publicKey = await jose.importSPKI(spki, alg);
	const { payload } = await jose.jwtVerify(access, publicKey);
	return payload;
};
