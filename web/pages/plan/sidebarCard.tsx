import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface Props {
	title: string;
	description: string;
	className?: string;
	titleClassName?: string;
}

export function SidebarCard({
	title,
	description,
	className,
	titleClassName,
}: Props) {
	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle className={titleClassName}>{title}</CardTitle>
				<CardDescription className="line-clamp-3">
					{description}
				</CardDescription>
			</CardHeader>
			<CardFooter className="place-content-end" />
		</Card>
	);
}
