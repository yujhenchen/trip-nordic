import { IconButton } from "@/components/common/iconButton";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PanelCardContainer } from "./panelCardContainer";
import useTripState from "@/states/useTripState";

interface Props {
	tripId: string;
	tripDayId: string;
}

export function PanelCardNew({ tripId, tripDayId }: Props) {
	const { addActivity } = useTripState();

	const handleCreate = () => {
		addActivity(tripId, tripDayId, {
			id: crypto.randomUUID(),
			name: "",
			content: "",
		});
		toast.success("New card added");
	};

	return (
		<PanelCardContainer className="h-20 flex place-content-center items-center overflow-hidden">
			<IconButton icon={<Plus />} onClick={handleCreate} />
		</PanelCardContainer>
	);
}
