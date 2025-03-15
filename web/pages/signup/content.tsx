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
} from "@/lib/definitions";
import { useMutation } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";

const apiUrl: string = import.meta.env.VITE_AUTH_API_URL;
const signUpUrl: string = `${apiUrl}/signup`;

export default function Content() {
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

	if (mutation.isPending)
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
				<LoadingSpinner variant="default" />
			</div>
		);

	if (mutation.isError) {
		toast(`Error: ${mutation.error}`);
		mutation.reset();
	}

	if (mutation.isSuccess) {
		toast("Congrats! You have signed up.");
		mutation.reset();
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
									placeholder="123@example.com"
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
								<Input
									placeholder="abc123"
									type="password"
									{...field}
								/>
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
								<Input
									placeholder="abc123"
									type="password"
									{...field}
								/>
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
