import { Plus } from "lucide-react";

import { IconButton } from "@/components/common/iconButton";
import { PanelContainer } from "./panelContainer";

interface Props {
	handleCreate: () => void;
}

export function PanelNew({ handleCreate }: Props) {
	return (
		<PanelContainer className="place-content-center items-center h-20 overflow-hidden">
			<IconButton icon={<Plus />} onClick={handleCreate} />
		</PanelContainer>
	);
}
