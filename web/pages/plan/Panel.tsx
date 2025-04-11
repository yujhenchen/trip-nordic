import type { ComponentProps, HTMLAttributes } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Card } from "@/components/ui/card";

import { ActionDropdown } from "./actionDropdown";
import { PanelCard } from "./panelCard";
import { PanelContainer } from "./panelContainer";
import { DatePicker } from "@/components/common/datePicker";
import type { PanelCardProps } from "./types";
import { PanelCardNew } from "./panelCardNew";
import type { SelectSingleEventHandler } from "react-day-picker";

export interface PanelProps extends ComponentProps<typeof Card> {
	tripId: string;
	tripDayId: string;
	date: Date;
	items: Array<PanelCardProps>;
	onSelectDate: SelectSingleEventHandler;
}

interface PanelContentProps extends ComponentProps<typeof ScrollArea> {}

interface PanelActionBarType extends HTMLAttributes<HTMLDivElement> {}

export function Panel({
	tripId,
	tripDayId,
	items,
	date,
	onSelectDate,
	...rest
}: PanelProps) {
	return (
		<PanelContainer {...rest} className="py-4">
			<Panel.ActionBar />
			<DatePicker date={date} onSelectDate={onSelectDate} />
			<Panel.Content>
				{items.map((item) => (
					<PanelCard key={item.id} {...item} />
				))}
				<PanelCardNew tripId={tripId} tripDayId={tripDayId} />
			</Panel.Content>
		</PanelContainer>
	);
}

Panel.ActionBar = function PanelActionBar({ ...rest }: PanelActionBarType) {
	return (
		<div className="w-full flex place-content-end px-4" {...rest}>
			<ActionDropdown />
		</div>
	);
};

Panel.Content = function PanelContent({
	children,
	...rest
}: PanelContentProps) {
	return (
		<ScrollArea className="px-4" {...rest}>
			{children}
			<div className="w-full h-24" />
		</ScrollArea>
	);
};
