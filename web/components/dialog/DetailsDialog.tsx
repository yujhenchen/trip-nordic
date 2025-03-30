import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FilterRow } from "@/pages/explore/Filter";
import { Badge } from "../ui/badge";
import { Bookmark } from "lucide-react";

interface Props {
	onClose: () => void;
	headerImage: {
		src: string;
		alt: string;
	};
	title: string;
	description: string;
	tags: Array<string>;
}

export default function DetailsDialog({
	onClose,
	headerImage,
	title,
	description,
	tags,
}: Props) {
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
					<FilterRow className="w-full overflow-x-auto">
						{tags.map((tag) => (
							<Badge key={tag} variant="default" className="text-center">
								{tag}
							</Badge>
						))}
					</FilterRow>
				) : null}

				<DialogHeader className="py-4">
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
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
				>
					<Bookmark />
					Keep
				</Button>
			</DialogContent>
		</Dialog>
	);
}
