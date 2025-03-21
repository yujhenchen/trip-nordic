import type { ReactNode } from "react";

export function ContentContainer({ children }: { children: ReactNode }) {
	return (
		<div className="bg-gray-200 w-full flex-1 flex flex-col space-y-8 place-content-center">
			{children}
		</div>
	);
}
