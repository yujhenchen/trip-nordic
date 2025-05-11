// import { X } from "lucide-react";
import { useFilters } from "./FilterProvider";
import { useDialog } from "@/components/providers/DialogProvider";
import { FilterPanel } from "./FilterPanel";
import {
	type ChangeEvent,
	useCallback,
	useEffect,
	useState,
	type MouseEvent,
} from "react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { gql, GraphQLClient } from "graphql-request";
import { toast } from "sonner";
import type {
	Activity,
	ActivityData,
	ActivityQueryParams,
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
	query GetActivities($search: String, $offset: Int, $first: Int!) {
		activities(search: $search, offset: $offset, first: $first) {
			activities {
				id
				categories
				city
				description
				name
				region
				seasons
			}
			totalCount
		}
	}
`;

const initQueryObject: ActivityQueryParams = {
	search: "",
	offset: 0,
	first: 30,
};

export function Content() {
	const {
		// currentFilters,
		toggleFilterOption,
		resetFilterSelectedOptions,
		resetAllFilterSelected,
	} = useFilters();
	const { open } = useDialog();

	const { handleOnKeep } = useActivityKeeps();

	const [queryObject, setQueryObject] =
		useState<ActivityQueryParams>(initQueryObject);

	const [allActivities, setAllActivities] = useState<Array<Activity>>([]);

	const { data, isFetching, isLoading, isError, isSuccess } =
		useQuery<ActivityData>({
			queryKey: ["activities", queryObject],
			queryFn: async ({ signal }): Promise<ActivityData> => {
				// TODO: endpoint should be env var
				const result = await new GraphQLClient(
					"http://127.0.0.1:8000/graphql",
					{ signal }
				).request<{
					activities: ActivityData;
				}>(query, queryObject);
				return result.activities;
			},
			placeholderData: keepPreviousData,
		});

	useEffect(() => {
		if (isSuccess && data.activities) {
			// TODO: handle when search or filters are apply, what to do with the init query data
			setAllActivities((prevData) => [...prevData, ...data.activities]);
		}
	}, [isSuccess, data?.activities]);

	const handleClickCard = useCallback(
		(event: MouseEvent) => (activity: Activity) => {
			const id = (event.currentTarget as HTMLElement).id;

			if (id === IDS.KEEP_ICON) {
				event.stopPropagation();

				handleOnKeep(activity);
				return;
			}

			const { city, categories, region, seasons } = activity;
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
				tags: [city, ...categories, region, ...seasons],
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

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQueryObject((prev) => ({ ...prev, search: e.target.value }));
	};

	if (isError) {
		toast.error("Something went wrong! Please try again later.");
	}

	return (
		<>
			<FilterPanel
				// chipIcon={<X size={16} />}
				toggleOption={handleToggleOption}
				onReset={handleReset}
				onResetAll={handleResetAll}
				searchKeyword={queryObject.search}
				handleSearchChange={handleSearchChange}
			/>
			{isLoading ? (
				<LoadingSpinner />
			) : isError ? null : (
				<CardGrid
					isLoading={isLoading}
					isFetching={isFetching}
					activities={allActivities}
					handleClickCard={handleClickCard}
					setQueryObject={setQueryObject}
				/>
			)}
		</>
	);
}
