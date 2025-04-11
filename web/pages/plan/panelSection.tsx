import { PanelNew } from "./panelNew";
import { Panel } from "./panel";
import { HorizontalScrollArea } from "@/components/common/horizontalScrollArea";
import type { TripDay } from "@/types/trips";
import { useTrip } from "./TripContext";
import { PanelCard } from "./panelCard";
import { PanelCardNew } from "./panelCardNew";
import { toast } from "sonner";

export function PanelSection() {
	const { state, dispatch } = useTrip();

	const handleSelectDate = (selectedDay: Date, tripDay: TripDay) => {
		dispatch({
			type: "updateDay",
			tripDay: { ...tripDay, date: selectedDay },
		});
	};

	const handleRemoveCard = (tripDayId: string, activityId: string) => {
		dispatch({ type: "removeActivity", tripDayId, activityId });
		toast.success("Activity removed");
	};

	const handleCreateCard = (tripDayId: string) => {
		dispatch({
			type: "addActivity",
			tripDayId,
			activity: {
				id: crypto.randomUUID(),
				name: "",
				content: "",
			},
		});
		toast.success("Activity added");
	};

	const handleCreatePanel = () => {
		dispatch({
			type: "addDay",
			tripDay: {
				id: crypto.randomUUID(),
				date: new Date(),
				activities: [],
			},
		});
		toast.success("New trip day added");
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
							handleRemove={() =>
								handleRemoveCard(tripDay.id, activity.id)
							}
						/>
					))}
					<PanelCardNew
						handleCreate={() => handleCreateCard(tripDay.id)}
					/>
				</Panel>
			))}
			<PanelNew handleCreate={handleCreatePanel} />
		</HorizontalScrollArea>
	);
}
