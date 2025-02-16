"use client";

import { X } from "lucide-react";
import { CardGrid, type CardProps } from "./CardGrid";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFilterProvider } from "./FilterProvider";
import { useDialog } from "@/components/providers/DialogProvider";
import { FilterPanel } from "./FilterPanel";
import type { FilterOptionType } from "./types";
import { activityTestData } from "./data/activityTestData";
import { anySourceElementInTarget } from "./utils";
import { useMemo } from "react";

const getSelectedFilterValues = (options: Array<FilterOptionType>) => {
	return options
		.filter((option) => option.isSelected)
		.map((option) => option.value);
};

export function Content() {
	const {
		filters,
		toggleFilterOption,
		resetFilterSelectedOptions,
		resetAllFilterSelected,
	} = useFilterProvider();
	const { open } = useDialog();

	const cards: Array<CardProps> = useMemo(
		() =>
			activityTestData
				.filter((activity) => {
					const selectedCities = getSelectedFilterValues(
						filters.city
					);
					const selectedCategories = getSelectedFilterValues(
						filters.category
					);
					const selectedRegions = getSelectedFilterValues(
						filters.region
					);
					const selectedSeasons = getSelectedFilterValues(
						filters.season
					);

					const isCategoryMatch =
						selectedCategories.length > 0
							? anySourceElementInTarget(
									activity.category.split(","),
									selectedCategories
							  )
							: true;

					const isCityMatch =
						selectedCities.length > 0
							? anySourceElementInTarget(
									activity.city.split(","),
									selectedCities
							  )
							: true;

					const isRegionMatch =
						selectedRegions.length > 0
							? anySourceElementInTarget(
									activity.region.split(","),
									selectedRegions
							  )
							: true;

					const isSeasonMatch =
						selectedSeasons.length > 0
							? anySourceElementInTarget(
									activity.seasons.split(","),
									selectedSeasons
							  )
							: true;

					return (
						isCategoryMatch &&
						isCityMatch &&
						isRegionMatch &&
						isSeasonMatch
					);
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
				}),
		[filters, open]
	);

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
