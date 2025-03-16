import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface Props {
	onClose: () => void;
	title: string;
	description: string;
}

const cardMode = {
	EDIT: "EDIT",
	VIEW: "VIEW",
} as const;

type CardModeType = keyof typeof cardMode;

export default function CardDialog({ onClose, title, description }: Props) {
	const [mode, setMode] = useState<CardModeType>(cardMode.VIEW);
	return (
		<Dialog open onOpenChange={onClose}>
			{/* <DialogTrigger>Open</DialogTrigger> */}
			<DialogContent className="p-10 w-full md:w-2/3 xl:w-2/5 max-w-full max-h-screen overflow-auto">
				<div className="flex flex-col md:flex-row space-x-4">
					<DialogHeader className="py-4 w-3/5">
						<DialogTitle>{title}</DialogTitle>
						{mode === cardMode.VIEW ? (
							<DialogDescription
								onDoubleClick={() => {
									setMode(cardMode.EDIT);
								}}
							>
								{description}
							</DialogDescription>
						) : (
							<Textarea
								defaultValue={description}
								onKeyDown={(e) => e.key === "Enter" && setMode(cardMode.VIEW)}
							/>
						)}
					</DialogHeader>

					<div className="flex space-y-4 flex-col w-2/5">
						<iframe
							title="Map"
							className="w-200 h-100"
							src="https://www.openstreetmap.org/export/embed.html?bbox=9.950866699218752%2C59.716945112398264%2C11.145629882812502%2C60.22685703775105&amp;layer=mapnik"
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
