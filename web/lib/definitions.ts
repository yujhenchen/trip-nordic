import { z } from "zod";

const passwordForm = z
	.object({
		password: z.string().min(6).max(30),
		confirm: z.string().min(6).max(30),
	})
	.refine((data) => data.password === data.confirm, {
		message: "Passwords don't match",
		path: ["confirm"],
	});

export const formSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email." }).trim(),
	passwords: passwordForm,
});

export type FormType = z.infer<typeof formSchema>;
