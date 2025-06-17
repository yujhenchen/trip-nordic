import type { ComponentProps, HTMLAttributes } from "react";
// import { ScrollArea } from "@/components/ui/scroll-area";

import { ActionDropdown } from "./actionDropdown";
import { PanelContainer } from "./panelContainer";
import { DroppableScrollArea } from "@/components/common/droppableScrollArea";

export interface PanelProps extends ComponentProps<typeof PanelContainer> {}

interface PanelContentProps
	extends ComponentProps<typeof DroppableScrollArea> {}

interface PanelActionBarType extends HTMLAttributes<HTMLDivElement> {
	handleConfirm: () => void;
}

export function Panel({ children, ...rest }: PanelProps) {
	return (
		<PanelContainer {...rest} className="py-4">
			{children}
		</PanelContainer>
	);
}

Panel.ActionBar = function PanelActionBar({
	handleConfirm,
	...rest
}: PanelActionBarType) {
	return (
		<div className="w-full flex place-content-end px-4" {...rest}>
			<ActionDropdown handleConfirm={handleConfirm} />
		</div>
	);
};

Panel.Content = function PanelContent({
	children,
	id,
	...rest
}: PanelContentProps) {
	return (
		// <ScrollArea className="px-4" {...rest}>
		// 	{children}
		// 	<div className="w-full h-24" />
		// </ScrollArea>
		<DroppableScrollArea id={id} className="px-4" {...rest}>
			{children}
			<div className="w-full h-24" />
		</DroppableScrollArea>
	);
};
