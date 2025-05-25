import type { ReactNode } from "react";

export function CardsContainer({ children }: { children: ReactNode }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
			{children}
		</div>
	);
}
