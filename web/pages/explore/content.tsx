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
import {
	type ComponentProps,
	useCallback,
	useMemo,
	type MouseEvent,
} from "react";
import type { Activity, FilterKeyType, FiltersType } from "./types";
import { useKeepStore } from "@/states/useKeepStore";

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

const IDS = {
	KEEP_ICON: "keep-icon",
} as const;

export function Content() {
	const {
		currentFilters,
		toggleFilterOption,
		resetFilterSelectedOptions,
		resetAllFilterSelected,
	} = useFilters();
	const { open } = useDialog();

	const { keeps, addKeep, removeKeep } = useKeepStore();

	const handleClickCard = useCallback(
		(event: MouseEvent) => (activity: Activity) => {
			const id = (event.currentTarget as HTMLElement).id;
			if (id === IDS.KEEP_ICON) {
				event.stopPropagation();

				if (keeps.includes(activity.id)) {
					removeKeep(activity.id);
				} else {
					addKeep(activity.id);
				}
			} else {
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
					activityId: activity.id,
				});
			}
		},
		[keeps, removeKeep, addKeep, open],
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
						onClick: (event) => handleClickCard(event)(activity),
						children: (
							<CardHeader>
								<Bookmark
									id={IDS.KEEP_ICON}
									className="self-end"
									onClick={(event) => handleClickCard(event)(activity)}
									fill={keeps.includes(activity.id) ? "currentColor" : "none"}
								/>
								<img
									src={activity.img?.src ?? "https://placehold.co/150x100"}
									alt={activity.img?.alt ?? "Card Image"}
								/>
								<CardTitle>{activity.name}</CardTitle>
								<CardDescription className="line-clamp-3">
									{activity.description}
								</CardDescription>
							</CardHeader>
						),
					};
				}),
		[currentFilters, handleClickCard, keeps],
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
