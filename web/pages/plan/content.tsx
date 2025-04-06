import { ControlPanel } from "./controlPanel";
import { PanelBlock } from "./panelBlock";

export function Content() {
	return (
		<div className="w-full flex-grow overflow-hidden flex flex-col">
			<ControlPanel />
			<PanelBlock />
		</div>
	);
}
