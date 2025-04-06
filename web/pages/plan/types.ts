import type { Card } from "@/components/ui/card";
import type { ComponentProps } from "react";

export interface PanelCardProps extends ComponentProps<typeof Card> {
	tripId: string;
	tripDayId: string;
	activityId: string;
	title: string;
	content: string;
}
