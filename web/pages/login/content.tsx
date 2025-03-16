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
import { loginFormSchema, LoginFormType } from "@/lib/authSchemas";
import { useMutation } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { AppProgress } from "@/components/common/AppProgress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const apiUrl: string = import.meta.env.VITE_AUTH_API_URL;
const loginUrl: string = `${apiUrl}/login`;

export default function Content() {
	const mutation = useMutation({
		mutationFn: async (data: LoginFormType) => {
			const response = await fetch(loginUrl, {
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

	const form = useForm<LoginFormType>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: LoginFormType) {
		console.log("Form submitted.");
		mutation.mutate(values);
	}

	if (mutation.isPending)
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
				<LoadingSpinner variant="default" />
			</div>
		);

	if (mutation.isError) {
		toast.error(`${mutation.error}`);
		mutation.reset();
	}

	if (mutation.isSuccess) {
		return (
			<div
				className={cn(
					"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50",
					"flex flex-col space-y-4"
				)}
			>
				<Label className="text-white">
					Login successful! Redirecting...
				</Label>
				<AppProgress
					defaultProgress={0}
					finalProgress={100}
					duration={1500}
					callback={() => location.replace("/")}
					callbackDelay={1000}
				/>
			</div>
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
