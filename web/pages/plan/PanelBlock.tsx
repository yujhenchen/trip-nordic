import type { Trip } from "@/states/useTripState";
import { PanelNew } from "./panelNew";
import { Panel } from "./panel";

interface Props {
	trip: Trip;
}

export function PanelBlock({ trip }: Props) {
	const { tripDays } = trip;
	return (
		<div className="w-full grow overflow-x-auto flex space-x-4 p-4">
			{tripDays.map((tripDay) => (
				<Panel
					key={tripDay.id}
					tripId={trip.id}
					tripDayId={tripDay.id}
					day={tripDay.day}
					items={tripDay.activities.map((activity) => ({
						id: activity.id,
						title: activity.name,
						content: activity.content,
					}))}
				/>
			))}
			<PanelNew tripId={trip.id} />
		</div>
	);
}
