import { Plus } from "lucide-react";

import { IconButton } from "@/components/common/iconButton";
import { PanelContainer } from "./panelContainer";
import { toast } from "sonner";
import useTripState from "@/states/useTripState";

interface Props {
	tripId: string;
}

export function PanelNew({ tripId }: Props) {
	const { addDay } = useTripState();

	const handleCreate = () => {
		addDay(tripId, {
			id: crypto.randomUUID(),
			day: new Date(),
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
