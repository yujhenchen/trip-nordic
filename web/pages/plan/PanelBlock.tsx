import { testPanels } from "./data/testPanelData";
import { Panel } from "./Panel";
import { PanelNew } from "./PanelNew";

export function PanelBlock() {
	return (
		<div className="w-full grow overflow-x-scroll flex space-x-4 p-4">
			{testPanels.map((panel) => (
				<Panel key={panel.id} {...panel} />
			))}
			<PanelNew />
		</div>
	);
}
