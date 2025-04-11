import {
	type Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import type { ComponentProps, MouseEvent } from "react";
import { IconButton } from "@/components/common/iconButton";
import { useDialog } from "@/components/providers/DialogProvider";
import { PanelCardContainer } from "./panelCardContainer";

interface PanelCardProps extends ComponentProps<typeof Card> {
	tripId: string;
	tripDayId: string;
	activityId: string;
	title: string;
	content: string;
	handleUpdate: (title: string, description: string) => void;
	handleRemove: () => void;
}

export const TARGET_IDS = {
	BUTTON_EDIT: "edit-card-btn",
	BUTTON_DELETE: "delete-card-btn",
} as const;

export function PanelCard({
	tripId,
	tripDayId,
	activityId,
	title,
	content,
	handleUpdate,
	handleRemove,
	...rest
}: PanelCardProps) {
	const { open } = useDialog();

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		const id = (event.currentTarget as HTMLElement).id;
		event.stopPropagation();

		switch (id) {
			case TARGET_IDS.BUTTON_DELETE:
				open("AppAlertDialog", {
					title: "Are you sure to remove this activity?",
					handleConfirm: handleRemove,
				});
				break;
			case TARGET_IDS.BUTTON_EDIT:
				open("EditActivityCardDialog", {
					title,
					description: content,
					handleSave: handleUpdate,
				});
				break;
			default:
				open("CardDialog", {
					title,
					description: content,
				});
				break;
		}
	};

	return (
		<PanelCardContainer id={activityId} {...rest} onClick={handleClick}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{content}</CardDescription>
			</CardHeader>
			<CardFooter className="flex space-x-4 place-content-end">
				<IconButton
					id={TARGET_IDS.BUTTON_EDIT}
					icon={<Pencil size={18} />}
					onClick={handleClick}
				/>
				<IconButton
					id={TARGET_IDS.BUTTON_DELETE}
					icon={<Trash2 size={18} />}
					onClick={handleClick}
				/>
			</CardFooter>
		</PanelCardContainer>
	);
}
