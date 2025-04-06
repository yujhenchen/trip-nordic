import type { Card } from "@/components/ui/card";
import type { ComponentProps } from "react";

export interface PanelCardProps extends ComponentProps<typeof Card> {
	title: string;
	content: string;
}
