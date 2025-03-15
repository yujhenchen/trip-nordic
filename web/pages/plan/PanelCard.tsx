import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import type { ComponentProps } from "react";
import { IconButton } from "@/components/common/IconButton";
import { cn } from "@/lib/utils";
import { useDialog } from "@/components/providers/DialogProvider";
import { toast } from "sonner";

export type PanelCardType = { id: string; title: string; description: string };

interface PanelCardProps extends ComponentProps<typeof Card> {
	card: PanelCardType;
}

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

export function PanelCard({ card, ...rest }: PanelCardProps) {
	const { open } = useDialog();
	return (
		<PanelCardContainer {...rest}>
			<CardHeader>
				<CardTitle>{card.title}</CardTitle>
				<CardDescription>{card.description}</CardDescription>
			</CardHeader>
			<CardFooter className="place-content-end">
				<IconButton
					icon={<Trash2 size={18} />}
					onClick={() => {
						open("AppAlertDialog", {
							title: "Are you sure to remove this card?",
						});
					}}
				/>
			</CardFooter>
		</PanelCardContainer>
	);
}

export function PanelCardNew() {
	return (
		<PanelCardContainer className="h-20 flex place-content-center items-center overflow-hidden">
			<IconButton
				icon={<Plus />}
				onClick={() => toast("New card added")}
			/>
		</PanelCardContainer>
	);
}
