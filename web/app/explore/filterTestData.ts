import type { FiltersType } from "./types";

export const testFilters: FiltersType = {
	Cities: [
		{ isSelected: true, value: "Stockholm" },
		{ isSelected: false, value: "Gothenburg" },
		{ isSelected: true, value: "Malmö" },
	],
	Categories: [
		{ isSelected: false, value: "Outdoor Activities" },
		{ isSelected: false, value: "Cultural & Historical Sites" },
		{ isSelected: true, value: "Food & Drinks" },
	],
	Countries: [
		{ isSelected: true, value: "Sweden" },
		{ isSelected: false, value: "Norway" },
	],
	Regions: [
		{ isSelected: false, value: "Scandinavia" },
		{ isSelected: true, value: "Nordic Countries" },
		{ isSelected: true, value: "Lapland" },
		{ isSelected: false, value: "Baltic Region" },
	],
	Seasons: [
		{ isSelected: true, value: "Winter" },
		{ isSelected: true, value: "Spring" },
		{ isSelected: true, value: "Summer" },
		{ isSelected: true, value: "Autumn" },
	],
};
