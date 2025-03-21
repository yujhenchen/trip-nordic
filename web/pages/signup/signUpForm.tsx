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
import {
	type SignUpDataType,
	signUpFormSchema,
	type SignUpFormType,
} from "@/lib/authSchemas";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { RedirectOverlay } from "@/components/common/RedirectOverlay";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { AuthFormWrapper } from "@/components/common/authFormWrapper";

const apiUrl: string = import.meta.env.VITE_AUTH_API_URL;
const signUpUrl: string = `${apiUrl}/signup`;

export function SignUpForm() {
	const mutation = useMutation({
		mutationFn: async (data: SignUpDataType) => {
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
		},
	});

	const form = useForm<SignUpFormType>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			email: "",
			passwords: {
				password: "",
				confirm: "",
			},
		},
	});

	async function onSubmit(values: SignUpFormType) {
		mutation.mutate({
			email: values.email,
			password: values.passwords.password,
		});
	}

	if (mutation.isPending) return <LoadingOverlay />;

	if (mutation.isError) {
		toast.error(`${mutation.error}`);
		mutation.reset();
	}

	if (mutation.isSuccess) {
		return (
			<RedirectOverlay
				message="Sign-up successful! Redirecting..."
				callback={() => location.assign("/login")}
				callbackDelay={1000}
			/>
		);
	}

	return (
		<Form {...form}>
			<AuthFormWrapper
				onSubmit={form.handleSubmit(onSubmit)}
				// className="space-y-8 w-full md:w-1/4 mx-auto"
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
					name="passwords.password"
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
				{/* Confirm Password */}
				<FormField
					control={form.control}
					name="passwords.confirm"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
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
