import type { ComponentProps, HTMLAttributes } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type PanelCardType = { id: string; title: string; description: string };

export interface PanelProps extends ComponentProps<typeof Card> {
	title: string;
	cards: Array<PanelCardType>;
}

interface PanelTitleProps extends HTMLAttributes<HTMLParagraphElement> {}

interface PanelContentProps extends ComponentProps<typeof ScrollArea> {}

interface PanelActionBarType extends HTMLAttributes<HTMLDivElement> {
	// removePanel: (panelId: string) => void;
}

interface PanelCardProps extends ComponentProps<typeof Card> {
	card: PanelCardType;
}

function PanelContainer({
	children,
	className,
	...rest
}: ComponentProps<typeof Card>) {
	return (
		<Card
			className={cn(
				"bg-pink-300 overflow-hidden shrink-0 w-full h-full md:w-72 flex flex-col",
				className,
			)}
			{...rest}
		>
			{children}
		</Card>
	);
}

export function Panel({ title, cards, ...rest }: PanelProps) {
	return (
		<PanelContainer {...rest}>
			<Panel.Title>{title}</Panel.Title>
			<Panel.ActionBar />
			<Panel.Content>
				{cards.map((card) => (
					<Panel.Card key={card.id} card={card} />
				))}
				<Panel.NewCard />
			</Panel.Content>
		</PanelContainer>
	);
}

Panel.NewPanel = function NewPanel() {
	return (
		<PanelContainer className="place-content-center items-center h-20 overflow-hidden">
			<button type="button" className="w-full h-full">
				+
			</button>
		</PanelContainer>
	);
};

Panel.Title = function PanelTitle({ children, ...rest }: PanelTitleProps) {
	return (
		<p className="flex place-content-center w-full p-4" {...rest}>
			{children}
		</p>
	);
};

Panel.ActionBar = function PanelActionBar({
	// removePanel,
	...rest
}: PanelActionBarType) {
	return (
		<div className="w-full flex place-content-end px-4" {...rest}>
			PanelActionBar
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

function PanelCardContainer({
	children,
	className,
	...rest
}: ComponentProps<typeof Card>) {
	return (
		<Card className={cn("my-2 h-36", className)} {...rest}>
			{children}
		</Card>
	);
}

Panel.Card = function PanelCard({ card, ...rest }: PanelCardProps) {
	return (
		<PanelCardContainer {...rest}>
			<CardHeader>
				<CardTitle>{card.title}</CardTitle>
				<CardDescription>{card.description}</CardDescription>
			</CardHeader>
		</PanelCardContainer>
	);
};

Panel.NewCard = function NewCard() {
	return (
		<PanelCardContainer className="h-20 flex place-content-center items-center overflow-hidden">
			<button type="button" className="w-full h-full">
				+
			</button>
		</PanelCardContainer>
	);
};
