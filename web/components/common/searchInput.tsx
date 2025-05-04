import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	wrapperClassName?: string;
}

export function SearchInput({ wrapperClassName, ...rest }: Props) {
	return (
		<div className={cn("relative w-full h-full", wrapperClassName)}>
			<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="2"
					stroke="currentColor"
					aria-hidden="true"
					className="w-5 h-5 text-gray-500 dark:text-gray-400"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>
			<label htmlFor="search" className="hidden">
				Search:
			</label>
			<Input
				id="search"
				type="text"
				className="w-full pl-10"
				placeholder="Search"
				{...rest}
			/>
		</div>
	);
}
