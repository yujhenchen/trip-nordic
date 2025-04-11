import { IconButton } from "@/components/common/iconButton";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PanelCardContainer } from "./panelCardContainer";
import { useTrip } from "./TripContext";

interface Props {
	tripDayId: string;
}

export function PanelCardNew({ tripDayId }: Props) {
	const { dispatch } = useTrip();

	const handleCreate = () => {
		dispatch({
			type: "addActivity",
			tripDayId,
			activity: {
				id: crypto.randomUUID(),
				name: "",
				content: "",
			},
		});
		toast.success("New card added");
	};

	return (
		<PanelCardContainer className="h-20 flex place-content-center items-center overflow-hidden">
			<IconButton icon={<Plus />} onClick={handleCreate} />
		</PanelCardContainer>
	);
}
