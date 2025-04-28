import { IconButton } from "@/components/common/iconButton";
import { useDialog } from "@/components/providers/DialogProvider";
import { Card } from "@/components/ui/card";
import { useProtectedAddTrip } from "@/hooks/use-protected-add-trip";
import type { NewTrip, Trip } from "@/types/trips";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function NewTripCard() {
	const { open } = useDialog();
	const protectedAddTrip = useProtectedAddTrip();

	const handleNewTrip = (newTripProps: NewTrip) => {
		const newTrip: Trip = {
			id: crypto.randomUUID(),
			name: newTripProps.name,
			date: newTripProps.date,
			tripDays: [],
		};
		protectedAddTrip(newTrip, () => {
			toast.success("Trip created");
		});
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
