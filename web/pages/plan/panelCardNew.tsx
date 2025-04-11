import { IconButton } from "@/components/common/iconButton";
import { Plus } from "lucide-react";
import { PanelCardContainer } from "./panelCardContainer";

interface Props {
	handleCreate: () => void;
}

export function PanelCardNew({ handleCreate }: Props) {
	return (
		<PanelCardContainer className="h-20 flex place-content-center items-center overflow-hidden">
			<IconButton icon={<Plus />} onClick={handleCreate} />
		</PanelCardContainer>
	);
}
