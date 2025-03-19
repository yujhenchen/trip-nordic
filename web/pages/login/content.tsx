import { z } from "zod";
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
import { RedirectOverlay } from "@/components/common/RedirectOverlay";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import useAuthStore from "@/states/useAuthStore";

const apiUrl: string = import.meta.env.VITE_AUTH_API_URL;
const loginUrl: string = `${apiUrl}/login`;

export default function Content() {
	const { setUser } = useAuthStore();

	const mutation = useMutation({
		mutationFn: async (data: LoginFormType) => {
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
			const jsonData = await response.json();
			setUser(jsonData.user);
			return jsonData;
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

	if (mutation.isError) {
		toast.error(`${mutation.error}`);
		mutation.reset();
	}

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
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 w-full md:w-1/4 mx-auto"
			>
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
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
