import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
	user: { email: string } | null;
	setUser: (user: { email: string } | null) => void;
}

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user }),
		}),
		{
			name: "auth",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useAuthStore;
