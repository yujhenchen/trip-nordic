import { ControlPanel } from "./ControlPanel";
import { PanelBlock } from "./PanelBlock";

export function Content() {
	return (
		<div className="w-full h-full overflow-hidden flex flex-col">
			<ControlPanel />
			<PanelBlock />
		</div>
	);
}
