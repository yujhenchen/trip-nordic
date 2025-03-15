import type { ComponentProps, HTMLAttributes } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Card } from "@/components/ui/card";

import { ActionDropdown } from "./ActionDropdown";
import { PanelCard, PanelCardNew, type PanelCardType } from "./PanelCard";
import { PanelContainer } from "./PanelContainer";

export interface PanelProps extends ComponentProps<typeof Card> {
	title: string;
	cards: Array<PanelCardType>;
}

interface PanelTitleProps extends HTMLAttributes<HTMLParagraphElement> {}

interface PanelContentProps extends ComponentProps<typeof ScrollArea> {}

interface PanelActionBarType extends HTMLAttributes<HTMLDivElement> {}

export function Panel({ title, cards, ...rest }: PanelProps) {
	return (
		<PanelContainer {...rest}>
			<Panel.Title>{title}</Panel.Title>
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

Panel.Title = function PanelTitle({ children, ...rest }: PanelTitleProps) {
	return (
		<p className="flex place-content-center w-full p-4" {...rest}>
			{children}
		</p>
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
