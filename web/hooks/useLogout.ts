import { logout } from "@/apis";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { navigate } from "vike/client/router";

export const useLogout = () => {
	const mutation = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			toast.success("Logout successful!");
			navigate("/login");
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
