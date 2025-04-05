import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface Props {
	onClose: () => void;
}

export default function NewTripDialog({ onClose }: Props) {
	const create = () => {
		toast.success("Trip created");
		onClose();
	};

	return (
		<Dialog open onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader className="py-4">
					<DialogTitle>New Trip</DialogTitle>
					<DialogDescription>description</DialogDescription>
					<div className="w-full flex space-x-4 justify-center">
						<Button variant="secondary" onClick={onClose}>
							Cancel
						</Button>
						<Button onClick={create}>Create</Button>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
