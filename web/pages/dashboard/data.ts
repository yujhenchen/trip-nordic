import { Settings, TentTree, User } from "lucide-react";

// Menu items for the sidebar
export const menuItems = [
	{
		id: "profile",
		label: "Profile",
		icon: User,
	},
	{
		id: "settings",
		label: "Settings",
		icon: Settings,
	},
	{
		id: "trips",
		label: "Trips",
		icon: TentTree,
	},
];

// Content for each section
export const contentSections = {
	profile: {
		title: "Profile",
		content: "Manage your personal information and account settings.",
	},
	settings: {
		title: "Settings",
		content: "Configure your dashboard preferences and notifications.",
	},
	trips: {
		title: "Trips",
		content: "View and manage your upcoming and past trips.",
	},
};
