import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import type { ComponentProps, MouseEvent } from "react";
import { IconButton } from "@/components/common/iconButton";
import { cn } from "@/lib/utils";
import { useDialog } from "@/components/providers/DialogProvider";
import { toast } from "sonner";

export type PanelCardType = { id: string; title: string; description: string };

export const TARGET_IDS = {
	BUTTON_DELETE: "delete-card-btn",
	CARD_CONTAINER: "card-container",
} as const;

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

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		const id = (event.currentTarget as HTMLElement).id;

		if (id === TARGET_IDS.CARD_CONTAINER) {
			open("CardDialog", {
				title: "test title",
				description: "test description",
			});
		} else if (id === TARGET_IDS.BUTTON_DELETE) {
			event.stopPropagation();
			open("AppAlertDialog", {
				title: "Are you sure to remove this card?",
			});
		}
	};

	return (
		<PanelCardContainer
			id={TARGET_IDS.CARD_CONTAINER}
			{...rest}
			onClick={handleClick}
		>
			<CardHeader>
				<CardTitle>{card.title}</CardTitle>
				<CardDescription>{card.description}</CardDescription>
			</CardHeader>
			<CardFooter className="place-content-end">
				<IconButton
					id={TARGET_IDS.BUTTON_DELETE}
					icon={<Trash2 size={18} />}
					onClick={handleClick}
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
				onClick={() => toast.success("New card added")}
			/>
		</PanelCardContainer>
	);
}
