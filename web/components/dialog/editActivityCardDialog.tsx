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

interface Props {
	onClose: () => void;
	title: string;
	description: string;
	handleSave: () => void;
}

export default function EditActivityCardDialog({
	onClose,
	title,
	description,
	handleSave,
}: Props) {
	return (
		<Dialog open onOpenChange={onClose}>
			{/* <DialogTrigger>Open</DialogTrigger> */}
			<DialogContent className="p-10 w-full md:w-2/3 xl:w-2/5 max-w-full max-h-screen overflow-auto">
				<DialogHeader>
					<DialogTitle>
						<Input
							defaultValue={title}
							onKeyDown={(e) => e.key === "Enter" && handleSave()}
						/>
					</DialogTitle>
					<DialogDescription>
						<Textarea
							defaultValue={description}
							onKeyDown={(e) => e.key === "Enter" && handleSave()}
						/>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="secondary" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
