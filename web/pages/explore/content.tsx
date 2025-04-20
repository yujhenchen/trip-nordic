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
// import { anySourceElementInTarget } from "./utils";
import {
	type ComponentProps,
	useCallback,
	useMemo,
	type MouseEvent,
} from "react";

import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { graphqlClient } from "@/graphql/client";
import { toast } from "sonner";
import type {
	Activity,
	ActivityData,
	FilterKeyType,
	// FiltersType,
} from "@/types/explore";
import { useActivityKeeps } from "@/hooks/use-activity-keeps";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { IDS } from "@/utils/ids";

// const isFilterMatch = (
// 	filters: FiltersType,
// 	filterKey: FilterKeyType,
// 	activityTags: Array<string>
// ) => {
// 	const selectedFilters = filters[filterKey] ?? [];
// 	return selectedFilters.length > 0
// 		? anySourceElementInTarget(activityTags, selectedFilters)
// 		: true;
// };

const query = gql`
	query GetActivities($first: Int!) {
		activities(first: $first) {
			activities {
				id
				category
				city
				descriptionen
				nameen
				region
				seasons
			}
			totalCount
		}
	}
`;

export function Content() {
	const {
		// currentFilters,
		toggleFilterOption,
		resetFilterSelectedOptions,
		resetAllFilterSelected,
	} = useFilters();
	const { open } = useDialog();

	// const { keeps, addKeep, removeKeep } = useKeepStore();
	// const keeps = useKeepActivities();
	// const { addKeep, unKeep } = useKeepActivitiesActions();
	const { keeps, handleOnKeep } = useActivityKeeps();

	const { data, isLoading, isError } = useQuery<ActivityData>({
		queryKey: ["activities"],
		queryFn: async (): Promise<ActivityData> => {
			try {
				const result = await graphqlClient.request<{
					activities: ActivityData;
				}>(query, {
					first: 100,
				});
				return result.activities;
			} catch (err) {
				return Promise.reject(err);
			}
		},
	});

	const handleClickCard = useCallback(
		(event: MouseEvent) => (activity: Activity) => {
			const id = (event.currentTarget as HTMLElement).id;

			if (id === IDS.KEEP_ICON) {
				event.stopPropagation();

				handleOnKeep(activity);
				return;
			}

			const { city, category, region, seasons } = activity;
			open("DetailsDialog", {
				// keeps,
				// handleKeep: handleOnKeep,
				// (activity: Activity) => {
				// 	const foundKeep = keeps.find(
				// 		(keep) => keep.id === activity.id
				// 	);

				// 	if (foundKeep) {
				// 		unKeep(foundKeep.id);
				// 	} else {
				// 		addKeep(activity);
				// 	}
				// },
				headerImage: {
					src: "https://placehold.co/300x200",
					alt: "",
				},
				activity,
				tags: [
					city,
					// TODO: perform default split with comma for API response
					...category.split(","),
					region,
					...seasons.split(","),
				],
			});
		},
		[handleOnKeep, open],
	);

	const cards: Array<ComponentProps<typeof Card>> = useMemo(
		() =>
			(data?.activities ?? [])
				// .filter((activity) => {
				// 	const isCategoryMatch = isFilterMatch(
				// 		currentFilters,
				// 		"category",
				// 		activity.category.split(",")
				// 	);

				// 	const isCityMatch = isFilterMatch(
				// 		currentFilters,
				// 		"city",
				// 		activity.city.split(",")
				// 	);

				// 	const isRegionMatch = isFilterMatch(
				// 		currentFilters,
				// 		"region",
				// 		activity.region.split(",")
				// 	);

				// 	const isSeasonMatch = isFilterMatch(
				// 		currentFilters,
				// 		"seasons",
				// 		activity.seasons.split(",")
				// 	);

				// 	return (
				// 		isCategoryMatch &&
				// 		isCityMatch &&
				// 		isRegionMatch &&
				// 		isSeasonMatch
				// 	);
				// })
				.map((a) => {
					const activity = {
						id: a.id,
						category: a.category,
						city: a.city,
						description: a.descriptionen,
						name: a.nameen,
						region: a.region,
						seasons: a.seasons,
					} satisfies Activity;
					return {
						id: activity.id,
						onClick: (event) => handleClickCard(event)(activity),
						children: (
							<CardHeader>
								<Bookmark
									id={IDS.KEEP_ICON}
									className="self-end"
									onClick={(event) => handleClickCard(event)(activity)}
									fill={
										keeps.find((keep) => keep.id === activity.id)
											? "currentColor"
											: "none"
									}
								/>
								<img
									// src={
									// 	activity.img?.src ??
									// 	"https://placehold.co/150x100"
									// }
									// alt={activity.img?.alt ?? "Card Image"}
									src="https://placehold.co/150x100"
									alt="Card"
								/>
								<CardTitle className="line-clamp-2">{activity.name}</CardTitle>
								<CardDescription className="line-clamp-3">
									{activity.description}
								</CardDescription>
							</CardHeader>
						),
					};
				}),
		[data, handleClickCard, keeps],
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

	if (isError) {
		toast.error("Something went wrong! Please try again later.");
	}

	return (
		<>
			<FilterPanel
				chipIcon={<X size={16} />}
				toggleOption={handleToggleOption}
				onReset={handleReset}
				onResetAll={handleResetAll}
			/>
			{isLoading ? (
				<LoadingSpinner />
			) : isError ? null : (
				<CardGrid cards={cards} />
			)}
		</>
	);
}
