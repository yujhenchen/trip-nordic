import { PanelNew } from "./panelNew";
import { Panel } from "./panel";
import { HorizontalScrollArea } from "@/components/common/horizontalScrollArea";
import type { Trip, TripDay } from "@/types/trips";
import { useTrip } from "./TripContext";

export function PanelSection() {
	const { state, dispatch } = useTrip();

	const handleSelectDate = (selectedDay: Date, tripDay: TripDay) => {
		dispatch({
			type: "updateDay",
			tripDay: { ...tripDay, date: selectedDay },
		});
	};

	return (
		<HorizontalScrollArea>
			{state.tripDays.map((tripDay) => (
				<Panel
					key={tripDay.id}
					tripId={state.id}
					tripDayId={tripDay.id}
					date={tripDay.date}
					onSelectDate={(_day, selectedDay, _activeModifiers, _e) =>
						handleSelectDate(selectedDay, tripDay)
					}
					items={tripDay.activities.map((activity) => ({
						activityId: activity.id,
						tripId: state.id,
						tripDayId: tripDay.id,
						title: activity.name,
						content: activity.content,
					}))}
				/>
			))}
			<PanelNew />
		</HorizontalScrollArea>
	);
}
