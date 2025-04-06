import {
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import type { MouseEvent } from "react";
import { IconButton } from "@/components/common/iconButton";
import { useDialog } from "@/components/providers/DialogProvider";
import { toast } from "sonner";
import { PanelCardContainer } from "./panelCardContainer";
import type { PanelCardProps } from "./types";
import useTripState from "@/states/useTripState";

export const TARGET_IDS = {
	BUTTON_DELETE: "delete-card-btn",
} as const;

export function PanelCard({
	tripId,
	tripDayId,
	activityId,
	title,
	content,
	...rest
}: PanelCardProps) {
	const { open } = useDialog();
	const { removeActivity } = useTripState();

	const handleConfirm = () => {
		removeActivity(tripId, tripDayId, activityId);
		toast.success("Trip Card removed");
	};

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		const id = (event.currentTarget as HTMLElement).id;

		if (id === TARGET_IDS.BUTTON_DELETE) {
			event.stopPropagation();
			open("AppAlertDialog", {
				title: "Are you sure to remove this activity?",
				handleConfirm,
			});
			return;
		}
		open("CardDialog", {
			title: "test title",
			description: "test description",
		});
	};

	return (
		<PanelCardContainer id={activityId} {...rest} onClick={handleClick}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{content}</CardDescription>
			</CardHeader>
			<CardFooter className="place-content-end">
				<IconButton
					id={TARGET_IDS.BUTTON_DELETE}
					icon={<Trash2 size={18} />}
					onClick={handleClick}
				/>
			</CardFooter>
		</PanelCardContainer>
	);
}
