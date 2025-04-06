import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<typeof AlertDialog> {
	title: string;
	description?: string;
	cancelText?: string;
	confirmText?: string;
	onClose: () => void;
	handleConfirm: () => void;
}

export default function AppAlertDialog({
	title,
	description,
	cancelText,
	confirmText,
	onClose,
	handleConfirm,
	...rest
}: Props) {
	return (
		<AlertDialog open onOpenChange={onClose} {...rest}>
			{/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>{cancelText ?? "Cancel"}</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirm}>
						{confirmText ?? "Confirm"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
