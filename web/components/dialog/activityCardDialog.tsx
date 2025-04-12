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
import { useRef, useState } from "react";
import { IconButton } from "../common/iconButton";
import { Pencil } from "lucide-react";

export const Mode = {
	VIEW: "VIEW",
	EDIT: "EDIT",
} as const;

type ModeType = keyof typeof Mode;

interface Props {
	onClose: () => void;
	mode: ModeType;
	title: string;
	description: string;
	handleSave: (title: string, description: string) => void;
}

export default function ActivityCardDialog({
	onClose,
	mode,
	title,
	description,
	handleSave,
}: Props) {
	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const [currentMode, setCurrentMode] = useState<ModeType>(mode);

	return (
		<Dialog open onOpenChange={onClose}>
			<DialogContent className="p-10 w-full md:w-2/3 xl:w-2/5 max-w-full max-h-screen overflow-auto">
				<DialogHeader>
					<DialogTitle>
						{currentMode === Mode.VIEW ? (
							<>{title}</>
						) : (
							<Input
								ref={(node) => {
									titleRef.current = node;
								}}
								defaultValue={title}
							/>
						)}
					</DialogTitle>
					<DialogDescription>
						{currentMode === Mode.VIEW ? (
							<>{description}</>
						) : (
							<Textarea
								ref={(node) => {
									descriptionRef.current = node;
								}}
								defaultValue={description}
							/>
						)}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					{currentMode === Mode.VIEW ? (
						<IconButton
							icon={<Pencil />}
							onClick={() => setCurrentMode(Mode.EDIT)}
						/>
					) : (
						<>
							<Button variant="secondary" onClick={onClose}>
								Cancel
							</Button>
							<Button
								onClick={() => {
									handleSave(
										titleRef.current?.value ?? title,
										descriptionRef.current?.value ?? description,
									);
									onClose();
								}}
							>
								Save
							</Button>
						</>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
