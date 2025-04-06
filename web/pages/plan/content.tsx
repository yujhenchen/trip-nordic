import { usePageContext } from "vike-react/usePageContext";
import { ControlPanel } from "./controlPanel";
import { PanelBlock } from "./panelBlock";
import useTripState, { type Trip } from "@/states/useTripState";
import { TripInfoBlock } from "./tripInfoBlock";

export function Content() {
	const { routeParams } = usePageContext();
	const { trips } = useTripState();
	const trip: Trip = trips.find((trip) => trip.id === routeParams?.id) ?? {
		id: "",
		name: "My Trip",
		date: { from: new Date(), to: new Date() },
		tripDays: [],
	};

	return (
		<div className="w-full flex-grow overflow-hidden flex flex-col">
			<ControlPanel>
				<TripInfoBlock trip={trip} />
			</ControlPanel>
			<PanelBlock />
		</div>
	);
}
