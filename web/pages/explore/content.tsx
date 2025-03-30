import { Bookmark, X } from "lucide-react";
import { CardGrid } from "./CardGrid";
import {
	type Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useFilters } from "./FilterProvider";
import { useDialog } from "@/components/providers/DialogProvider";
import { FilterPanel } from "./FilterPanel";
import { activityTestData } from "./data/activityTestData";
import { anySourceElementInTarget } from "./utils";
import { type ComponentProps, useCallback, useMemo } from "react";
import type { Activity, FilterKeyType, FiltersType } from "./types";

const isFilterMatch = (
	filters: FiltersType,
	filterKey: FilterKeyType,
	activityTags: Array<string>,
) => {
	const selectedFilters = filters[filterKey] ?? [];
	return selectedFilters.length > 0
		? anySourceElementInTarget(activityTags, selectedFilters)
		: true;
};

export function Content() {
	const {
		currentFilters,
		toggleFilterOption,
		resetFilterSelectedOptions,
		resetAllFilterSelected,
	} = useFilters();
	const { open } = useDialog();

	const handleClickCard = useCallback(
		(activity: Activity) => {
			const { name, description, city, category, region, seasons } = activity;
			open("DetailsDialog", {
				headerImage: {
					src: "https://placehold.co/300x200",
					alt: "",
				},
				title: name,
				description: description,
				tags: [
					city,
					// TODO: perform default split with comma for API response
					...category.split(","),
					region,
					...seasons.split(","),
				],
			});
		},
		[open],
	);

	const cards: Array<ComponentProps<typeof Card>> = useMemo(
		() =>
			activityTestData
				.filter((activity) => {
					const isCategoryMatch = isFilterMatch(
						currentFilters,
						"category",
						activity.category.split(","),
					);

					const isCityMatch = isFilterMatch(
						currentFilters,
						"city",
						activity.city.split(","),
					);

					const isRegionMatch = isFilterMatch(
						currentFilters,
						"region",
						activity.region.split(","),
					);

					const isSeasonMatch = isFilterMatch(
						currentFilters,
						"season",
						activity.seasons.split(","),
					);

					return (
						isCategoryMatch && isCityMatch && isRegionMatch && isSeasonMatch
					);
				})
				.map((activity) => {
					return {
						id: activity.id,
						onClick: () => handleClickCard(activity),
						children: (
							<CardHeader>
								<img
									src={activity.img?.src ?? "https://placehold.co/150x100"}
									alt={activity.img?.alt ?? "Card Image"}
								/>
								<CardTitle>{activity.name}</CardTitle>
								<CardDescription className=" line-clamp-3">
									{activity.description}
								</CardDescription>
								<Bookmark className="self-end" />
							</CardHeader>
						),
					};
				}),
		[currentFilters, handleClickCard],
	);

	const handleToggleOption = (filterKey: FilterKeyType, option: string) => {
		toggleFilterOption(filterKey, option);
	};

	const handleReset = (filterKey: FilterKeyType) => {
		resetFilterSelectedOptions(filterKey);
	};

	const handleResetAll = () => {
		resetAllFilterSelected();
	};

	return (
		<>
			<FilterPanel
				chipIcon={<X size={16} />}
				toggleOption={handleToggleOption}
				onReset={handleReset}
				onResetAll={handleResetAll}
			/>
			<CardGrid cards={cards} />
		</>
	);
}
