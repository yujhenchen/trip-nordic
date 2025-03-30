import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { CheckIcon, X } from "lucide-react";
import { IconButton } from "../common/iconButton";
import { MODE, useEditableMode } from "@/hooks/useEditableMode";

interface CardDialogProps {
	onClose: () => void;
	title: string;
	description: string;
}

export const IDS = {
	TITLE_EDIT: "title-edit",
	CONTENT_EDIT: "content-edit",
} as const;

const Title = ({ text }: { text: string }) => {
	const { mode, edit, save, cancel } = useEditableMode();

	return (
		<>
			{mode === MODE.VIEW ? (
				<DialogTitle onDoubleClick={edit}>{text}</DialogTitle>
			) : (
				<div className="flex items-center">
					<Input
						id={IDS.TITLE_EDIT}
						defaultValue={text}
						onKeyDown={(e) => e.key === "Enter" && save()}
					/>
					<IconButton icon={<CheckIcon />} onClick={save} />
					<IconButton icon={<X />} onClick={cancel} />
				</div>
			)}
		</>
	);
};

const Desc = ({ text }: { text: string }) => {
	const { mode, edit, save, cancel } = useEditableMode();

	return (
		<>
			{mode === MODE.VIEW ? (
				<DialogDescription onDoubleClick={edit}>
					{text}
				</DialogDescription>
			) : (
				<div className="flex items-center">
					<Textarea
						id={IDS.CONTENT_EDIT}
						defaultValue={text}
						onKeyDown={(e) => e.key === "Enter" && save()}
					/>
					<IconButton icon={<CheckIcon />} onClick={save} />
					<IconButton icon={<X />} onClick={cancel} />
				</div>
			)}
		</>
	);
};

export default function CardDialog({
	onClose,
	title,
	description,
}: CardDialogProps) {
	return (
		<Dialog open onOpenChange={onClose}>
			{/* <DialogTrigger>Open</DialogTrigger> */}
			<DialogContent className="p-10 w-full md:w-2/3 xl:w-2/5 max-w-full max-h-screen overflow-auto">
				<div className="flex flex-col md:flex-row space-x-4">
					<DialogHeader className="py-4 w-3/5">
						<Title text={title} />

						<Desc text={description} />
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
