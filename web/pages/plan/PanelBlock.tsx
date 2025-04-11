import type { Trip, TripDay } from "@/states/useTripsState";
import { PanelNew } from "./panelNew";
import { Panel } from "./panel";
import { HorizontalScrollArea } from "@/components/common/horizontalScrollArea";
import useTripsState from "@/states/useTripsState";

interface Props {
	trip: Trip;
}

export function PanelBlock({ trip }: Props) {
	const { tripDays } = trip;
	const { updateDay } = useTripsState();

	const handleSelectDate = (
		tripId: string,
		selectedDay: Date,
		tripDay: TripDay,
	) => {
		updateDay(tripId, {
			...tripDay,
			date: selectedDay,
		});
	};

	return (
		<HorizontalScrollArea>
			{tripDays.map((tripDay) => (
				<Panel
					key={tripDay.id}
					tripId={trip.id}
					tripDayId={tripDay.id}
					date={tripDay.date}
					onSelectDate={(_day, selectedDay, _activeModifiers, _e) =>
						handleSelectDate(trip.id, selectedDay, tripDay)
					}
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
