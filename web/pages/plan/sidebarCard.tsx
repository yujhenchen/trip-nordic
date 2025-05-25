import type { ComponentProps, MouseEvent, RefObject } from "react";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { IDS } from "@/utils/ids";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
	cardRef?: ComponentProps<typeof Card>["ref"];
	title: string;
	description: string;
	handleClick: (event: MouseEvent<Element>) => void;
	className?: string;
	titleClassName?: string;
}

export function SidebarCard({
	cardRef,
	title,
	description,
	handleClick,
	className,
	titleClassName,
}: Props) {
	return (
		<Card
			ref={cardRef}
			className={cn("bg-gray-200 dark:bg-gray-800", className)}
			onClick={handleClick}
		>
			<CardHeader>
				<Bookmark
					id={IDS.KEEP_ICON}
					className="self-end"
					fill={"currentColor"}
					onClick={handleClick}
				/>
				<CardTitle className={cn("line-clamp-2", titleClassName)}>
					{title}
				</CardTitle>
				<CardDescription className="line-clamp-3">
					{description}
				</CardDescription>
			</CardHeader>
			<CardFooter className="place-content-end" />
		</Card>
	);
}
