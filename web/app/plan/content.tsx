import { ControlPanel } from "./ControlPanel";
import { PanelBlock } from "./PanelBlock";

export function Content() {
	return (
		<div className="grow overflow-hidden bg-gray-300">
			<ControlPanel />
			<PanelBlock />
		</div>
	);
}
