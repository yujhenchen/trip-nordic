import { PanelNew } from "./panelNew";
import { Panel } from "./panel";
import { HorizontalScrollArea } from "@/components/common/horizontalScrollArea";
import type { TripActivity, TripDay } from "@/types/trips";
import { useTrip } from "./TripContext";
import { PanelCard } from "./panelCard";
import { PanelCardNew } from "./panelCardNew";
import { toast } from "sonner";
import { DatePicker } from "@/components/common/datePicker";

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

	const handleUpdateCard = (tripDayId: string, activity: TripActivity) => {
		dispatch({ type: "updateActivity", tripDayId, activity });
		toast.success("Activity updated");
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

	const handleConfirm = (tripDayId: string) => {
		dispatch({ type: "removeDay", tripDayId });
		toast.success("Trip Plan removed");
	};

	return (
		<HorizontalScrollArea>
			{state.tripDays.map((tripDay) => (
				<Panel key={tripDay.id}>
					<Panel.ActionBar handleConfirm={() => handleConfirm(tripDay.id)} />
					<DatePicker
						date={tripDay.date}
						onSelectDate={(_day, selectedDay, _activeModifiers, _e) =>
							handleSelectDate(selectedDay, tripDay)
						}
					/>
					{tripDay.activities.map((activity) => (
						<PanelCard
							key={activity.id}
							tripId={state.id}
							tripDayId={tripDay.id}
							activityId={activity.id}
							title={activity.name}
							content={activity.content}
							handleRemove={() => handleRemoveCard(tripDay.id, activity.id)}
							handleUpdate={(title: string, description: string) =>
								handleUpdateCard(tripDay.id, {
									...activity,
									name: title,
									content: description,
								})
							}
						/>
					))}
					<PanelCardNew handleCreate={() => handleCreateCard(tripDay.id)} />
				</Panel>
			))}
			<PanelNew handleCreate={handleCreatePanel} />
		</HorizontalScrollArea>
	);
}
