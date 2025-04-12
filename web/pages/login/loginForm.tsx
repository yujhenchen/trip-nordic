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
import { AuthFormWrapper } from "@/components/common/authFormWrapper";
import { login } from "@/apis";
import { navigate } from "vike/client/router";

interface Props {
	onMutateCallback: () => void;
	onSettledCallback: () => void;
}

export function LogInForm({ onMutateCallback, onSettledCallback }: Props) {
	const mutation = useMutation({
		mutationFn: login<LoginFormType>,
		onSuccess: (_data) => {
			toast.success("Login successful!");
			setTimeout(() => {
				navigate("/");
			}, 500);
		},
		onError: (error) => {
			toast.error(`${error}`);
		},
		onMutate: onMutateCallback,
		onSettled: onSettledCallback,
	});

	const form = useForm<LoginFormType>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: LoginFormType) {
		mutation.mutate(values);
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
