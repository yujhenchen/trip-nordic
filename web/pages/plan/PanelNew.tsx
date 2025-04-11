import { Plus } from "lucide-react";

import { IconButton } from "@/components/common/iconButton";
import { PanelContainer } from "./panelContainer";
import { toast } from "sonner";
import { useTrip } from "./TripContext";

export function PanelNew() {
	const { dispatch } = useTrip();

	const handleCreate = () => {
		dispatch({
			type: "addDay",
			tripDay: {
				id: crypto.randomUUID(),
				date: new Date(),
				activities: [],
			},
		});
		toast.success("New trip day added");
	};

	return (
		<PanelContainer className="place-content-center items-center h-20 overflow-hidden">
			<IconButton icon={<Plus />} onClick={handleCreate} />
		</PanelContainer>
	);
}
