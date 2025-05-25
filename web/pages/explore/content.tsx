import { useDialog } from "@/components/providers/DialogProvider";
import { FilterPanel } from "./filterPanel";
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
	GQLFiActivityResponse,
	ActivityQueryParams,
	FilterKeyType,
	FiActivities,
} from "@/types/explore";
import { useActivityKeeps } from "@/hooks/use-activity-keeps";
import { IDS } from "@/utils/ids";
import { CardGrid } from "./cardGrid";
import { SkeletonCard } from "@/components/common/skeletonCard";
import { CardsContainer } from "./cardsContainer";

const SKELETON_CARD_COUNT = 3;

const graphqlUrl = import.meta.env.VITE_GRAPHQL_API_URL;

const query = gql`
	query GetFiActivities(
		$orderBy: String
		$limit: Int!
		$offset: Int
		$cities: [String!]
		$regions: [String!]
		$categories: [String!]
		$seasons: [String!]
		$keyword: String
	) {
		fiActivities(
			orderBy: $orderBy
			limit: $limit
			offset: $offset
			cities: $cities
			regions: $regions
			categories: $categories
			seasons: $seasons
			keyword: $keyword
		) {
			items {
				id
				name
				seasons
				categories
				city
				region
				description
			}
			totalItemsCount
		}
	}
`;

const initQueryObject: ActivityQueryParams = {
	keyword: "",
	filters: {},
	offset: 0,
	limit: 30,
	orderBy: "",
};

const initActivityData: FiActivities = {
	items: [],
	totalItemsCount: 0,
};

export function Content() {
	const { open } = useDialog();

	const { handleOnKeep } = useActivityKeeps();

	const [queryParams, setQueryParams] =
		useState<ActivityQueryParams>(initQueryObject);

	const [allActivityData, setAllActivityData] =
		useState<FiActivities>(initActivityData);

	const { keyword, limit, offset, orderBy, filters } = queryParams;
	const graphqlVariables = {
		keyword,
		limit,
		offset,
		orderBy,
		...filters,
	};

	const { data, isFetching, isLoading, isError, isSuccess } =
		useQuery<GQLFiActivityResponse>({
			queryKey: ["activities", queryParams],
			queryFn: async ({ signal }): Promise<GQLFiActivityResponse> => {
				const result = await new GraphQLClient(graphqlUrl, {
					signal,
				}).request<GQLFiActivityResponse>(query, graphqlVariables);
				return result;
			},
			placeholderData: keepPreviousData,
		});

	useEffect(() => {
		if (isSuccess && data.fiActivities) {
			setAllActivityData((prev) => ({
				items: [...prev.items, ...data.fiActivities.items],
				totalItemsCount: data.fiActivities.totalItemsCount,
			}));
		}
	}, [isSuccess, data?.fiActivities]);

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
		[handleOnKeep, open],
	);

	const handleToggleOption = (filterKey: FilterKeyType, option: string) => {
		setAllActivityData((prev) => ({
			...prev,
			items: [],
		}));
		setQueryParams((prev) => {
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
		setAllActivityData((prev) => ({
			...prev,
			items: [],
		}));
		setQueryParams((prev) => {
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
		setAllActivityData((prev) => ({
			...prev,
			items: [],
		}));
		setQueryParams((prev) => ({
			...prev,
			filters: {},
			offset: 0,
		}));
	};

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		// When the search input changes:
		// 1. Update the query object with the new search term and reset the offset to 0.
		// 2. Clear the existing list of activities to prepare for fresh results based on the new search.
		setQueryParams((prev) => ({
			...prev,
			keyword: e.target.value,
			offset: 0,
		}));
		setAllActivityData((prev) => ({
			...prev,
			items: [],
		}));
	};

	const handleChangeCities = (value: unknown) => {
		if (Array.isArray(value)) {
			setAllActivityData((prev) => ({
				...prev,
				items: [],
			}));
			const newCityFilters = value.map((option) => option.value as string);
			setQueryParams((prev) => {
				return {
					...prev,
					filters: {
						...prev.filters,
						cities: newCityFilters,
					},
					offset: 0,
				};
			});
		}
	};

	if (isError) {
		toast.error("Something went wrong! Please try again later.");
	}

	return (
		<>
			<FilterPanel
				selectedFilters={queryParams.filters}
				toggleOption={handleToggleOption}
				onReset={handleReset}
				onResetAll={handleResetAll}
				searchKeyword={queryParams.keyword}
				handleSearchChange={handleSearchChange}
				handleChangeCities={handleChangeCities}
				className="rounded-3xl bg-gray-200 dark:bg-gray-800 p-4"
			/>

			{isLoading && (
				<CardsContainer>
					{Array.from({ length: SKELETON_CARD_COUNT }).map(() => (
						<SkeletonCard key={crypto.randomUUID()} />
					))}
				</CardsContainer>
			)}
			{isError && null}
			{isSuccess && (
				<CardGrid
					isLoading={isLoading}
					isFetching={isFetching}
					activities={allActivityData.items}
					totalCount={allActivityData.totalItemsCount}
					handleClickCard={handleClickCard}
					setQueryParams={setQueryParams}
				/>
			)}
		</>
	);
}
