import { Settings, TentTree, User } from "lucide-react";

export const ItemLabel = {
	profile: "Profile",
	settings: "Settings",
	trips: "Trips",
} as const;

type IconType = typeof Settings;

export type ItemLabelKeyType = keyof typeof ItemLabel;

export type ItemLabelType = (typeof ItemLabel)[ItemLabelKeyType];

// Menu items for the sidebar
export const menuItems: Array<{
	id: ItemLabelKeyType;
	label: ItemLabelType;
	icon: IconType;
}> = [
	{
		id: "profile",
		label: ItemLabel.profile,
		icon: User,
	},
	{
		id: "settings",
		label: ItemLabel.settings,
		icon: Settings,
	},
	{
		id: "trips",
		label: ItemLabel.trips,
		icon: TentTree,
	},
];

// Content for each section
export const contentSections: Record<
	ItemLabelKeyType,
	{ title: ItemLabelType; content: string }
> = {
	profile: {
		title: ItemLabel.profile,
		content: "Manage your personal information and account settings.",
	},
	settings: {
		title: ItemLabel.settings,
		content: "Configure your dashboard preferences and notifications.",
	},
	trips: {
		title: ItemLabel.trips,
		content: "View and manage your upcoming and past trips.",
	},
};
