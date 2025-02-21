import { ClipboardCopy, Save } from "lucide-react";
import { IconButton } from "@/components/common/IconButton";

export function ControlPanel() {
	return (
		<div className="w-full h-16 place-content-end flex space-x-4 border px-8 items-center">
			<IconButton icon={<Save />} />
			<IconButton icon={<ClipboardCopy />} />
		</div>
	);
}
