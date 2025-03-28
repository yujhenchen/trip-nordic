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
import useAuthStore from "@/states/useAuthStore";
import { AuthFormWrapper } from "@/components/common/authFormWrapper";
import { login } from "@/apis";

interface Props {
	onMutateCallback: () => void;
	onSettledCallback: () => void;
}

export function LogInForm({ onMutateCallback, onSettledCallback }: Props) {
	const { setUser } = useAuthStore();

	const mutation = useMutation({
		mutationFn: login<LoginFormType>,
		onSuccess: (data) => {
			toast.success("Login successful!");
			setUser(data.user);
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

	if (mutation.isSuccess) {
		return (
			<RedirectOverlay
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
