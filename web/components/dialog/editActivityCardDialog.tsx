import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useRef } from "react";

interface Props {
	onClose: () => void;
	title: string;
	description: string;
	handleSave: (title: string, description: string) => void;
}

export default function EditActivityCardDialog({
	onClose,
	title,
	description,
	handleSave,
}: Props) {
	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	return (
		<Dialog open onOpenChange={onClose}>
			{/* <DialogTrigger>Open</DialogTrigger> */}
			<DialogContent className="p-10 w-full md:w-2/3 xl:w-2/5 max-w-full max-h-screen overflow-auto">
				<DialogHeader>
					<DialogTitle>
						<Input
							ref={(node) => {
								titleRef.current = node;
							}}
							defaultValue={title}
						/>
					</DialogTitle>
					<DialogDescription>
						<Textarea
							ref={(node) => {
								descriptionRef.current = node;
							}}
							defaultValue={description}
						/>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="secondary" onClick={onClose}>
						Cancel
					</Button>
					<Button
						onClick={() => {
							handleSave(
								titleRef.current?.value ?? title,
								descriptionRef.current?.value ?? description
							);
							onClose();
						}}
					>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
