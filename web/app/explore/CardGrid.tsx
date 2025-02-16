import { Card } from "../components/ui/card";

export interface Props {
	cards: Array<CardProps>;
}

export interface CardProps {
	id: string;
	children: React.ReactNode;
	ref?: React.Ref<HTMLDivElement>;
	onClick?: () => void;
	className?: string;
}

export function CardGrid({ cards }: Props) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{cards.map(({ id, ref, onClick, children }) => (
				<Card ref={ref} key={id} onClick={onClick}>
					{children}
				</Card>
			))}
		</div>
	);
}
