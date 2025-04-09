import type { Trip } from "@/states/useTripState";
import { PanelNew } from "./panelNew";
import { Panel } from "./panel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Props {
	trip: Trip;
}

export function PanelBlock({ trip }: Props) {
	const { tripDays } = trip;
	return (
		<ScrollArea>
			<div className="flex w-max space-x-4 p-4">
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
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
