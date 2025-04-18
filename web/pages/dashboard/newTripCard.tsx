import { IconButton } from "@/components/common/iconButton";
import { useDialog } from "@/components/providers/DialogProvider";
import { Card } from "@/components/ui/card";
import { useTripsActions } from "@/states/useTripsState";
import type { NewTrip } from "@/types/trips";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function NewTripCard() {
	const { open } = useDialog();
	const { addTrip } = useTripsActions();

	const handleNewTrip = (newTripProps: NewTrip) => {
		addTrip({
			id: crypto.randomUUID(),
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
