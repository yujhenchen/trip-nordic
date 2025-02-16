import { lazy } from "react";

export const DialogManager = {
	DetailsDialog: lazy(() => import("@/components/dialog/DetailsDialog")),
} as const;

export type DialogType = keyof typeof DialogManager;
