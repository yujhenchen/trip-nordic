const apiUrl: string = import.meta.env.VITE_AUTH_API_URL;

export const login = async <T extends Record<string, unknown>>(data: T) => {
	const loginUrl = `${apiUrl}/login`;
	const response = await fetch(loginUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return await response.json();
};

export const signUp = async <T extends Record<string, unknown>>(data: T) => {
	const signUpUrl = `${apiUrl}/signup`;
	const response = await fetch(signUpUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return response.json();
};

export const logout = async () => {
	const logoutUrl = `${apiUrl}/logout`;
	const response = await fetch(logoutUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return await response.json();
};

export const getTokens = async (refresh: string) => {
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

	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return await response.json();
};
