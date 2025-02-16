import { FilterChip, FilterRow } from "@/app/explore/Filter";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

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
			<DialogContent className="p-10 w-full md:w-2/3 xl:w-2/5 max-w-full max-h-screen overflow-scroll">
				<img
					src={headerImage.src}
					alt={headerImage.alt}
					className="w-3/5 object-cover mx-auto"
				/>
				<div className="flex flex-col md:flex-row space-x-4">
					<DialogHeader className="py-4 w-3/5">
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>

					<div className="flex space-y-4 flex-col w-2/5">
						{tags.length > 0 ? (
							<FilterRow className="w-full overflow-x-scroll">
								{tags.map((tag) => (
									<FilterChip
										key={tag}
										selected={false}
										value={tag}
										selectedIcon={null}
									/>
								))}
							</FilterRow>
						) : null}
						<iframe
							title="Map"
							className="w-200 h-100"
							src="https://www.openstreetmap.org/export/embed.html?bbox=9.950866699218752%2C59.716945112398264%2C11.145629882812502%2C60.22685703775105&amp;layer=mapnik"
						/>
					</div>
				</div>
				<Button
					variant="default"
					size="lg"
					className="rounded-xl w-fit mx-auto"
				>
					Keep
				</Button>
			</DialogContent>
		</Dialog>
	);
}
