import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
	user: { email: string } | null;
	setUser: (user: { email: string }) => void;
	logout: () => void;
}

const apiUrl: string = import.meta.env.VITE_AUTH_API_URL;
const logoutUrl: string = `${apiUrl}/logout`;

const logout = async (url: string) => {
	const response = await fetch(url, {
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

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user }),
			logout: async () => {
				try {
					await logout(logoutUrl);
					set({ user: null });
				} catch (error) {
					console.error(error);
				}
			},
		}),
		{
			name: "auth",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useAuthStore;
