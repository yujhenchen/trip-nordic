import { testPanels } from "./data/testPanelData";
import { Panel } from "./Panel";

export function PanelBlock() {
	return (
		<div className="w-full h-96 overflow-x-scroll flex space-x-4 p-4">
			{testPanels.map((panel) => (
				<Panel key={panel.id} {...panel} />
			))}
			<Panel.NewPanel />
		</div>
	);
}
