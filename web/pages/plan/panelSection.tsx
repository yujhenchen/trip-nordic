import { PanelNew } from "./panelNew";
import { Panel } from "./panel";
import { HorizontalScrollArea } from "@/components/common/horizontalScrollArea";
import type { TripDay } from "@/types/trips";
import { useTrip } from "./TripContext";
import { PanelCard } from "./panelCard";
import { PanelCardNew } from "./panelCardNew";

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
					date={tripDay.date}
					onSelectDate={(_day, selectedDay, _activeModifiers, _e) =>
						handleSelectDate(selectedDay, tripDay)
					}
				>
					{tripDay.activities.map((activity) => (
						<PanelCard
							key={activity.id}
							tripId={state.id}
							tripDayId={tripDay.id}
							activityId={activity.id}
							title={activity.name}
							content={activity.content}
						/>
					))}
					<PanelCardNew tripDayId={tripDay.id} />
				</Panel>
			))}
			<PanelNew />
		</HorizontalScrollArea>
	);
}
