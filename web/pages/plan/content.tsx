import { ControlPanel } from "./ControlPanel";
import { PanelBlock } from "./PanelBlock";

export function Content() {
	return (
		<div className="w-full flex-grow overflow-hidden flex flex-col">
			<ControlPanel />
			<PanelBlock />
		</div>
	);
}
