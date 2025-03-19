import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
	user: { email: string } | null;
	setUser: (user: { email: string }) => void;
	logout: () => void;
}

const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			setUser: (user) => set({ user }),
			logout: () => set({ user: null }),
		}),
		{
			name: "auth",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useAuthStore;
