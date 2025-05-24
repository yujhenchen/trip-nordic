import { cn } from "@/lib/utils";

export function CopyRight() {
	return (
		<span
			className={cn(
				"text-sm text-gray-500 sm:text-center dark:text-gray-300",
				"font-extrabold",
			)}
		>
			© 2025{" "}
			<a
				href="https://github.com/yujhenchen/trip-nordic"
				className="hover:underline"
			>
				TripNordic™
			</a>
			. All Rights Reserved.
		</span>
	);
}
