import type { ComponentProps, HTMLAttributes } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Card } from "@/components/ui/card";

import { ActionDropdown } from "./actionDropdown";
import { PanelContainer } from "./panelContainer";

export interface PanelProps extends ComponentProps<typeof Card> {}

interface PanelContentProps extends ComponentProps<typeof ScrollArea> {}

interface PanelActionBarType extends HTMLAttributes<HTMLDivElement> {
	handleConfirm: () => void;
}

export function Panel({ children, ...rest }: PanelProps) {
	return (
		<PanelContainer {...rest} className="py-4">
			<Panel.Content>{children}</Panel.Content>
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
	...rest
}: PanelContentProps) {
	return (
		<ScrollArea className="px-4" {...rest}>
			{children}
			<div className="w-full h-24" />
		</ScrollArea>
	);
};
