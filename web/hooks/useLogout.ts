import { logout } from "@/apis";
import useAuthStore from "@/states/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogout = () => {
	const { setUser } = useAuthStore();

	const mutation = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			toast.success("Logout successful!");
			setUser(null);
		},
		onError: (error) => {
			toast.error(`${error}`);
		},
	});

	return {
		logout: mutation.mutate,
		isLoading: mutation.isPending,
	};
};
