import { Plus } from "lucide-react";

import { IconButton } from "@/components/common/IconButton";
import { PanelContainer } from "./PanelContainer";
import { toast } from "sonner";

export function PanelNew() {
	return (
		<PanelContainer className="place-content-center items-center h-20 overflow-hidden">
			<IconButton
				icon={<Plus />}
				onClick={() => toast.success("New card added")}
			/>
		</PanelContainer>
	);
}
