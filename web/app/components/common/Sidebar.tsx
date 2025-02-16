import type { ReactNode } from "react";

export function Sidebar({ children }: { children: ReactNode }) {
	return (
		<div
			id="sidebar"
			className={"p-5 flex flex-col shrink-0 border-r-2 border-r-gray-200"}
		>
			{children}
		</div>
	);
}
