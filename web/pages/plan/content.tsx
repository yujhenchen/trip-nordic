import { usePageContext } from "vike-react/usePageContext";
import { ControlPanel } from "./controlPanel";
import { PanelSection } from "./panelSection";
import { TripProvider } from "./TripContext";
import { useTrips } from "@/states/useTripsState";

export function Content() {
	const { routeParams } = usePageContext();
	const trips = useTrips();
	const tripId = routeParams?.id ?? "";
	const trip = tripId
		? (trips.find((trip) => trip.id === tripId) ?? null)
		: null;

	return (
		<div className="w-full h-full flex-grow overflow-hidden flex flex-col">
			<TripProvider {...(trip ? { defaultTrip: trip } : {})}>
				<ControlPanel trip={trip} />
				<PanelSection trip={trip} />
			</TripProvider>
		</div>
	);
}
