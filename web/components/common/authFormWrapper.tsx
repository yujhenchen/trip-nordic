import type { ReactNode } from "react";

interface Props {
	onSubmit: () => void;
	children: ReactNode;
}

export function AuthFormWrapper({ onSubmit, children }: Props) {
	return (
		<form
			onSubmit={onSubmit}
			className="space-y-8 w-full md:w-1/4 mx-auto bg-gray-50 border border-gray-200 rounded-3xl p-8"
		>
			{children}
		</form>
	);
}
