"use client";

import { X } from "lucide-react";
import { CardGrid, type CardProps } from "./CardGrid";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFilterProvider } from "./FilterProvider";
import { useDialog } from "@/components/providers/DialogProvider";
import { activityTestData } from "./activityTestData";
import { FilterPanel } from "./FilterPanel";
import { FilterOptionType } from "./types";

export function Content() {
	const {
		filters,
		toggleFilterOption,
		resetFilterSelectedOptions,
		resetAllFilterSelected,
	} = useFilterProvider();
	const { open } = useDialog();

	const cards: Array<CardProps> = activityTestData
		.filter((data) => {
			// TODO: get  selected filters in each filter, if empty array, do not filter that property
			return data;
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
						tags: ["A", "B", "C"],
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
