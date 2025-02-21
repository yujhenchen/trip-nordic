import { Card } from "@/components/ui/card";
import { ComponentProps } from "react";

interface Props {
	cards: Array<ComponentProps<typeof Card>>;
}

export function CardGrid({ cards }: Props) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{cards.map(({ id, ref, onClick, children, ...rest }) => (
				<Card ref={ref} key={id} onClick={onClick} {...rest}>
					{children}
				</Card>
			))}
		</div>
	);
}
