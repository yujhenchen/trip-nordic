import { type ComponentProps, lazy } from "react";

export const DialogManager = {
	DetailsDialog: lazy(() => import("@/components/dialog/DetailsDialog")),
	AppAlertDialog: lazy(() => import("@/components/dialog/AppAlertDialog")),
	CardDialog: lazy(() => import("@/components/dialog/CardDialog")),
	NewTripDialog: lazy(() => import("@/components/dialog/newTripDialog")),
} as const;

export type DialogType = keyof typeof DialogManager;

export type DialogProps = {
	[K in DialogType]: Omit<ComponentProps<(typeof DialogManager)[K]>, "onClose">;
}[DialogType];
