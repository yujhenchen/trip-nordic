import { IconButton } from "@/components/common/iconButton";
import { useDialog } from "@/components/providers/DialogProvider";
import { Card } from "@/components/ui/card";
import useTripState from "@/states/useTripState";
import type { NewTrip } from "@/types/trips";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export function NewTripCard() {
	const { open } = useDialog();
	const { addTrip } = useTripState();

	const handleNewTrip = (newTripProps: NewTrip) => {
		addTrip({
			id: uuidv4(),
			name: newTripProps.name,
			date: newTripProps.date,
			tripDays: [],
		});
		toast.success("Trip created");
	};

	const handleAdd = () => {
		open("NewTripDialog", {
			handleNewTrip,
		});
	};

	return (
		<Card className="w-full h-20 flex place-content-center items-center overflow-hidden">
			<IconButton icon={<Plus />} onClick={handleAdd} />
		</Card>
	);
}
