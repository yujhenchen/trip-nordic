import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "../ui/badge";
import { Bookmark } from "lucide-react";
import { HorizontalScrollArea } from "../common/horizontalScrollArea";
import { ScrollArea } from "../ui/scroll-area";
import type { Activity } from "@/types/explore";
import { useActivityKeeps } from "@/hooks/use-activity-keeps";

interface Props {
	onClose: () => void;
	headerImage: {
		src: string;
		alt: string;
	};
	activity: Activity;
	tags: Array<string>;
}

export default function DetailsDialog({
	onClose,
	headerImage,
	activity,
	tags,
}: Props) {
	const { keeps, handleOnKeep } = useActivityKeeps();
	const isKept = keeps.find((keep) => keep.id === activity.id);

	return (
		<Dialog open onOpenChange={onClose}>
			{/* <DialogTrigger>Open</DialogTrigger> */}
			<DialogContent>
				<img
					src={headerImage.src}
					alt={headerImage.alt}
					className="w-3/5 object-cover mx-auto"
				/>

				{tags.length > 0 ? (
					<HorizontalScrollArea>
						{tags.map((tag) => (
							<Badge key={tag} variant="default" className="text-center">
								{tag}
							</Badge>
						))}
					</HorizontalScrollArea>
				) : null}

				<DialogHeader className="py-4">
					<DialogTitle>{activity.name}</DialogTitle>
					<DialogDescription className="max-h-48">
						<ScrollArea className="h-full">{activity.description}</ScrollArea>
					</DialogDescription>
				</DialogHeader>

				<iframe
					title="Map"
					className="w-200 h-100"
					src="https://www.openstreetmap.org/export/embed.html?bbox=9.950866699218752%2C59.716945112398264%2C11.145629882812502%2C60.22685703775105&amp;layer=mapnik"
				/>
				<Button
					variant="default"
					size="lg"
					className="rounded-xl w-fit mx-auto"
					onClick={() => {
						handleOnKeep(activity);
					}}
				>
					<Bookmark fill={isKept ? "currentColor" : "none"} />
					Keep
				</Button>
			</DialogContent>
		</Dialog>
	);
}
