import { PanelNew } from "./panelNew";
import { Panel } from "./panel";
import { HorizontalScrollArea } from "@/components/common/horizontalScrollArea";
import type { Trip, TripActivity, TripDay } from "@/types/trips";
import { PanelCard } from "./panelCard";
import { PanelCardNew } from "./panelCardNew";
import { toast } from "sonner";
import { DatePicker } from "@/components/common/datePicker";
import { defaultTrip, useTrips, useTripsActions } from "@/states/useTripsState";
import { navigate } from "vike/client/router";
import { useProtectedAddTrip } from "@/hooks/use-protected-add-trip";

interface Props {
	trip: Trip | null;
}

export function PanelSection({ trip }: Props) {
	const {
		addDay,
		updateDay,
		removeDay,
		addActivity,
		updateActivity,
		removeActivity,
	} = useTripsActions();
	const protectedAddTrip = useProtectedAddTrip();

	const handleSelectDate = (selectedDay: Date, tripDay: TripDay) => {
		if (trip) {
			updateDay(trip.id, { ...tripDay, date: selectedDay });
			toast.success("Date updated");
		}
	};

	const handleRemoveCard = (tripDayId: string, activityId: string) => {
		if (trip) {
			removeActivity(trip.id, tripDayId, activityId);
			toast.success("Activity removed");
		}
	};

	const handleCreateCard = (tripDayId: string) => {
		if (trip) {
			addActivity(trip.id, tripDayId, {
				id: crypto.randomUUID(),
				name: "",
				content: "",
			});
			toast.success("Activity added");
		}
	};

	const handleUpdateCard = (tripDayId: string, activity: TripActivity) => {
		if (trip) {
			updateActivity(trip.id, tripDayId, activity);
			toast.success("Activity updated");
		}
	};

	const handleCreatePanel = () => {
		if (trip) {
			addDay(trip.id, {
				id: crypto.randomUUID(),
				date: new Date(),
				activities: [],
			});
			toast.success("New trip day added");
			return;
		}
		const id = crypto.randomUUID();
		const newTrip: Trip = {
			...defaultTrip,
			id,
			tripDays: [
				{
					id: crypto.randomUUID(),
					date: new Date(),
					activities: [],
				},
			],
		};
		protectedAddTrip(newTrip, () => {
			navigate(`/plan/${id}`);
			toast.success("New trip day added");
		});
	};

	const handleConfirm = (tripDayId: string) => {
		if (trip) {
			removeDay(trip.id, tripDayId);
			toast.success("Trip Plan removed");
		}
	};

	return (
		<HorizontalScrollArea>
			{trip?.tripDays.map((tripDay) => (
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
							tripId={trip.id}
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
