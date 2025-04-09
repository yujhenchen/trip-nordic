import type { Trip } from "@/states/useTripState";
import { PanelNew } from "./panelNew";
import { Panel } from "./panel";
import { HorizontalScrollArea } from "@/components/common/horizontalScrollArea";

interface Props {
	trip: Trip;
}

export function PanelBlock({ trip }: Props) {
	const { tripDays } = trip;
	return (
		<HorizontalScrollArea>
			{tripDays.map((tripDay) => (
				<Panel
					key={tripDay.id}
					tripId={trip.id}
					tripDayId={tripDay.id}
					day={tripDay.day}
					items={tripDay.activities.map((activity) => ({
						activityId: activity.id,
						tripId: trip.id,
						tripDayId: tripDay.id,
						title: activity.name,
						content: activity.content,
					}))}
				/>
			))}
			<PanelNew tripId={trip.id} />
		</HorizontalScrollArea>
	);
}
