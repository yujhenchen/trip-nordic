import type { ComponentProps, HTMLAttributes } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Card } from "@/components/ui/card";

import { ActionDropdown } from "./ActionDropdown";
import { PanelCard, PanelCardNew, type PanelCardType } from "./PanelCard";
import { PanelContainer } from "./PanelContainer";
import { DatePicker } from "@/components/common/datePicker";
import { cn } from "@/lib/utils";

export interface PanelProps extends ComponentProps<typeof Card> {
	title: string;
	cards: Array<PanelCardType>;
}

interface PanelTitleProps extends HTMLAttributes<HTMLDivElement> {}

interface PanelContentProps extends ComponentProps<typeof ScrollArea> {}

interface PanelActionBarType extends HTMLAttributes<HTMLDivElement> {}

export function Panel({ title, cards, ...rest }: PanelProps) {
	return (
		<PanelContainer {...rest}>
			<Panel.Title>
				{title}
				<DatePicker />
			</Panel.Title>
			<Panel.ActionBar />
			<Panel.Content>
				{cards.map((card) => (
					<PanelCard key={card.id} card={card} />
				))}
				<PanelCardNew />
			</Panel.Content>
		</PanelContainer>
	);
}

Panel.Title = function PanelTitle({
	children,
	className,
	...rest
}: PanelTitleProps) {
	return (
		<div
			className={cn(
				"flex flex-col place-content-center text-center w-full p-4",
				className,
			)}
			{...rest}
		>
			{children}
		</div>
	);
};

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
