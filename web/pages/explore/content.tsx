import { X } from "lucide-react";
import { useFilters } from "./FilterProvider";
import { useDialog } from "@/components/providers/DialogProvider";
import { FilterPanel } from "./FilterPanel";
import { useCallback, useMemo, type MouseEvent } from "react";

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
import { CardGrid } from "./cardGrid";

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

	const { handleOnKeep } = useActivityKeeps();

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
		[handleOnKeep, open]
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

	// TODO: filter by selected filters
	const cardActivities = useMemo(
		() =>
			data?.activities.map((activity) => ({
				id: activity.id,
				category: activity.category,
				city: activity.city,
				description: activity.descriptionen,
				name: activity.nameen,
				region: activity.region,
				seasons: activity.seasons,
			})) ?? [],
		[data?.activities]
	);

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
				<CardGrid
					activities={cardActivities}
					handleClickCard={handleClickCard}
				/>
			)}
		</>
	);
}
