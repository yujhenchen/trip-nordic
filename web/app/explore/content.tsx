"use client";

import { X } from "lucide-react";
import { CardGrid, type CardProps } from "./CardGrid";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFilterProvider } from "./FilterProvider";
import { useDialog } from "@/components/providers/DialogProvider";
import { FilterPanel } from "./FilterPanel";
import type { FilterOptionType } from "./types";
import { activityTestData } from "./data/activityTestData";

export function Content() {
	const {
		filters,
		toggleFilterOption,
		resetFilterSelectedOptions,
		resetAllFilterSelected,
	} = useFilterProvider();
	const { open } = useDialog();

	const cards: Array<CardProps> = activityTestData
		.filter((activity) => {
			// loop the key in filters
			// if activity has key (case insensitive), get the value of the key, split into a string array
			return activity;
		})
		.map((activity) => {
			return {
				id: activity.id,
				onClick: () => {
					open("DetailsDialog", {
						headerImage: {
							src: "https://placehold.co/300x200",
							alt: "",
						},
						title: activity.name,
						description: activity.description,
						tags: [
							activity.city,
							// TODO: perform default split with comma for API response
							...activity.category.split(","),
							activity.region,
							...activity.seasons.split(","),
						],
					});
				},
				children: (
					<CardHeader>
						<img
							src={
								activity.img?.src ??
								"https://placehold.co/150x100"
							}
							alt={activity.img?.alt ?? "Card Image"}
						/>
						<CardTitle>{activity.name}</CardTitle>
						<CardDescription className=" line-clamp-3">
							{activity.description}
						</CardDescription>
					</CardHeader>
				),
			};
		});

	const handleToggleOption = (title: string, option: FilterOptionType) => {
		toggleFilterOption(title, option);
	};

	const handleReset = (title: string) => {
		resetFilterSelectedOptions(title);
	};

	const handleResetAll = () => {
		resetAllFilterSelected();
	};

	return (
		<>
			<FilterPanel
				filters={filters}
				chipIcon={<X size={16} />}
				toggleOption={handleToggleOption}
				onReset={handleReset}
				onResetAll={handleResetAll}
			/>

			<CardGrid cards={cards} />
		</>
	);
}
