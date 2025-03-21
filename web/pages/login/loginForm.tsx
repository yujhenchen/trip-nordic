import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { loginFormSchema, type LoginFormType } from "@/lib/authSchemas";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { RedirectOverlay } from "@/components/common/redirectOverlay";
import { LoadingOverlay } from "@/components/common/loadingOverlay";
import useAuthStore from "@/states/useAuthStore";
import { AuthFormWrapper } from "@/components/common/authFormWrapper";

const apiUrl: string = import.meta.env.VITE_AUTH_API_URL;
const loginUrl: string = `${apiUrl}/login`;

const login = async (data: LoginFormType) => {
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

export function LogInForm() {
	const { setUser } = useAuthStore();

	const mutation = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			setUser(data.user);
		},
		onError: (error) => {
			toast.error(`${error}`);
		},
	});

	const form = useForm<LoginFormType>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: LoginFormType) {
		// TODO: is it correct to mutate at client side and get jwt token from response like this?
		// TODO: HTTP-Only Cookies
		// TODO: refresh token
		mutation.mutate(values);
	}

	if (mutation.isPending) return <LoadingOverlay />;

	if (mutation.isSuccess) {
		return (
			<RedirectOverlay
				message="Login successful! Redirecting..."
				callback={() => location.assign("/")}
				callbackDelay={1000}
			/>
		);
	}

	return (
		<Form {...form}>
			<AuthFormWrapper onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="test123@example.com"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Password */}
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					Submit
				</Button>
			</AuthFormWrapper>
		</Form>
	);
}
