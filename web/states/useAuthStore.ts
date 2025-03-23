import { logout } from "@/apis";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
	user: { email: string } | null;
	setUser: (user: { email: string }) => void;
	logout: () => void;
}

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user }),
			logout: async () => {
				try {
					await logout();
					set({ user: null });
				} catch (error) {
					console.error(error);
					toast.error(`${error}`);
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
