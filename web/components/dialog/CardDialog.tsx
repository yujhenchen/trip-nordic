import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Input } from "../ui/input";
import { IconButton } from "../common/IconButton";
import { CheckIcon, CrossIcon, X } from "lucide-react";

interface Props {
	onClose: () => void;
	title: string;
	description: string;
}

export const IDS = {
	TITLE_EDIT: "title-edit",
	CONTENT_EDIT: "content-edit",
} as const;

const MODE = {
	EDIT: "EDIT",
	VIEW: "VIEW",
} as const;

type ModeType = keyof typeof MODE;

const Title = ({ text }: { text: string }) => {
	const [mode, setMode] = useState<ModeType>(MODE.VIEW);
	const edit = () => {
		setMode(MODE.EDIT);
	};

	const save = () => {
		setMode(MODE.VIEW);
	};

	const cancel = () => {
		setMode(MODE.VIEW);
	};

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
	const [mode, setMode] = useState<ModeType>(MODE.VIEW);

	const edit = () => {
		setMode(MODE.EDIT);
	};

	const save = () => {
		setMode(MODE.VIEW);
	};

	const cancel = () => {
		setMode(MODE.VIEW);
	};

	return (
		<>
			{mode === MODE.VIEW ? (
				<DialogDescription
					onDoubleClick={() => {
						setMode(MODE.EDIT);
					}}
				>
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

export default function CardDialog({ onClose, title, description }: Props) {
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
