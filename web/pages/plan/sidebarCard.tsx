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
}

export function SidebarCard({ title, description }: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription className="line-clamp-3">
					{description}
				</CardDescription>
			</CardHeader>
			<CardFooter className="place-content-end" />
		</Card>
	);
}
