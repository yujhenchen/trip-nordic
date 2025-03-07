"use client";

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

const passwordForm = z
	.object({
		password: z.string().min(6).max(30),
		confirm: z.string().min(6).max(30),
	})
	.refine((data) => data.password === data.confirm, {
		message: "Passwords don't match",
		path: ["confirm"],
	});

const formSchema = z.object({
	username: z
		.string()
		.min(2, {
			message: "Username must be at least 2 characters.",
		})
		.max(30, {
			message: "Username must not exceed 30 characters.",
		}),
	passwords: passwordForm,
});

export default function Content() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			passwords: {
				password: "",
				confirm: "",
			},
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log("Form submitted.");
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 w-full md:w-1/4 mx-auto"
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="my name" {...field} />
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
								<Input placeholder="abc123" type="password" {...field} />
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
								<Input placeholder="abc123" type="password" {...field} />
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
