import { Plus } from "lucide-react";

import { IconButton } from "@/components/common/iconButton";
import { PanelContainer } from "./panelContainer";
import { toast } from "sonner";
import { useTripsState } from "@/states/useTripsState";

interface Props {
	tripId: string;
}

export function PanelNew({ tripId }: Props) {
	const { addDay } = useTripsState();

	const handleCreate = () => {
		addDay(tripId, {
			id: crypto.randomUUID(),
			date: new Date(),
			activities: [],
		});
		toast.success("New trip day added");
	};

	return (
		<PanelContainer className="place-content-center items-center h-20 overflow-hidden">
			<IconButton icon={<Plus />} onClick={handleCreate} />
		</PanelContainer>
	);
}
