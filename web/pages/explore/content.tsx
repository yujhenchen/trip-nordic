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
} from "@/types/explore";
import { useActivityKeeps } from "@/hooks/use-activity-keeps";
import { IDS } from "@/utils/ids";
import { CardGrid } from "./cardGrid";
import { SkeletonCard } from "@/components/common/skeletonCard";

const query = gql`
	query GetActivities(
		$search: String
		$offset: Int
		$first: Int!
		$filters: ActivityFilterInput
	) {
		activities(
			search: $search
			offset: $offset
			first: $first
			filters: $filters
		) {
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
	filters: {},
	offset: 0,
	first: 30,
};

export function Content() {
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
		setAllActivities([]);
		setQueryObject((prev) => {
			const newFilters = structuredClone(prev.filters);
			const options = newFilters[filterKey];
			if (options) {
				newFilters[filterKey] = options.includes(option)
					? options.filter((o) => o !== option)
					: [...options, option];
			} else {
				newFilters[filterKey] = [option];
			}
			return {
				...prev,
				filters: newFilters,
				offset: 0,
			};
		});
	};

	const handleReset = (filterKey: FilterKeyType) => {
		setAllActivities([]);
		setQueryObject((prev) => {
			const newFilters = structuredClone(prev.filters);
			newFilters[filterKey] = [];
			return {
				...prev,
				filters: newFilters,
				offset: 0,
			};
		});
	};

	const handleResetAll = () => {
		setAllActivities([]);
		setQueryObject((prev) => ({
			...prev,
			filters: {},
			offset: 0,
		}));
	};

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		// When the search input changes:
		// 1. Update the query object with the new search term and reset the offset to 0.
		// 2. Clear the existing list of activities to prepare for fresh results based on the new search.
		setQueryObject((prev) => ({
			...prev,
			search: e.target.value,
			offset: 0,
		}));
		setAllActivities([]);
	};

	if (isError) {
		toast.error("Something went wrong! Please try again later.");
	}

	return (
		<>
			<FilterPanel
				selectedFilters={queryObject.filters}
				toggleOption={handleToggleOption}
				onReset={handleReset}
				onResetAll={handleResetAll}
				searchKeyword={queryObject.search}
				handleSearchChange={handleSearchChange}
			/>
			{isLoading && <SkeletonCard />}
			{isError && null}
			{isSuccess && (
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
