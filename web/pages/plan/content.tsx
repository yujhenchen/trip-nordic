import { usePageContext } from "vike-react/usePageContext";
import { ControlPanel } from "./controlPanel";
// import { PanelBlock } from "./panelBlock";
import useTripState from "@/states/useTripState";

export function Content() {
	const { routeParams } = usePageContext();
	const { trips } = useTripState();
	const tripId = routeParams?.id ?? "";
	const trip = tripId
		? (trips.find((trip) => trip.id === tripId) ?? null)
		: null;

	return (
		<div className="w-full flex-grow overflow-hidden flex flex-col">
			<ControlPanel trip={trip} />
			{/* <PanelBlock trip={trip} /> */}
		</div>
	);
}
