import type { ComponentProps, HTMLAttributes } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Card } from "@/components/ui/card";

import { ActionDropdown } from "./actionDropdown";
import { PanelCard, PanelCardNew, type PanelCardType } from "./panelCard";
import { PanelContainer } from "./panelContainer";
import { DatePicker } from "@/components/common/datePicker";
import { cn } from "@/lib/utils";
import { MODE, useEditableMode } from "@/hooks/useEditableMode";
import { Input } from "@/components/ui/input";
import { IconButton } from "@/components/common/iconButton";
import { CheckIcon, X } from "lucide-react";

export interface PanelProps extends ComponentProps<typeof Card> {
	title: string;
	cards: Array<PanelCardType>;
}

interface PanelTitleProps extends HTMLAttributes<HTMLDivElement> {
	text: string;
}

interface PanelContentProps extends ComponentProps<typeof ScrollArea> {}

interface PanelActionBarType extends HTMLAttributes<HTMLDivElement> {}

export function Panel({ title, cards, ...rest }: PanelProps) {
	return (
		<PanelContainer {...rest}>
			<Panel.Title text={title} />
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
	text,
	className,
	...rest
}: PanelTitleProps) {
	const { mode, edit, save, cancel } = useEditableMode();

	return (
		<div
			className={cn(
				"flex flex-col place-content-center text-center w-full p-4 space-y-2",
				className
			)}
			{...rest}
		>
			{mode === MODE.VIEW ? (
				<p onDoubleClick={edit}>{text}</p>
			) : (
				<div className="flex items-center">
					<Input
						// id="panel-title-id"
						defaultValue={text}
						onKeyDown={(e) => e.key === "Enter" && save()}
					/>
					<IconButton icon={<CheckIcon />} onClick={save} />
					<IconButton icon={<X />} onClick={cancel} />
				</div>
			)}
			<DatePicker />
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
