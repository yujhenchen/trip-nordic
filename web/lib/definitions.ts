import { z } from "zod";

const passwordSchema = z.object({
	password: z.string().min(6).max(30),
	confirm: z.string().min(6).max(30),
});

const passwordForm = passwordSchema.refine(
	(data) => data.password === data.confirm,
	{
		message: "Passwords don't match",
		path: ["confirm"],
	},
);

export const signUpFormSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email." }).trim(),
	passwords: passwordForm,
});

export type SignUpFormType = z.infer<typeof signUpFormSchema>;

export type SignUpDataType = {
	email: SignUpFormType["email"];
	password: SignUpFormType["passwords"]["password"];
};
