import { Button } from "@/components/ui/button";
import { ClipboardCopy, Save } from "lucide-react";

export function ControlPanel() {
	return (
		<div className="w-full h-16 place-content-end flex space-x-4 border px-8 items-center">
			<button type="button" className="w-fit h-fit">
				<Save />
			</button>
			<button type="button" className="w-fit h-fit">
				<ClipboardCopy />
			</button>
		</div>
	);
}
