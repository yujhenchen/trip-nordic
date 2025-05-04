import { Button } from "@/components/ui/button";
import {
	FilterContent,
	FilterRowTitle,
	FilterTitle,
	FilterChip,
} from "./Filter";
// import { useFilters } from "./FilterProvider";
import { SearchInput } from "@/components/common/searchInput";
import { HorizontalScrollArea } from "@/components/common/horizontalScrollArea";
import type {
	// FilterKeyTitle,
	GQLFilterData,
	GQLFilterResponse,
	FilterKeyType,
} from "@/types/explore";
import { gql } from "graphql-request";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/graphql/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export interface Props {
	chipIcon: React.ReactNode;
	toggleOption: (filterKey: FilterKeyType, option: string) => void;
	onReset: (filterKey: FilterKeyType) => void;
	onResetAll: () => void;
	title?: string;
	className?: string;
}

export interface FilterPanelRow {
	title: string;
	options: Array<string>;
}

const filtersQuery = gql`
	query GetFilters {
		filters {
			name
			items
		}
	}
`;

export function FilterPanel({
	title,
	chipIcon,
	className,
	// toggleOption,
	// onReset,
	onResetAll,
}: Props) {
	// const {
	// 	filters,
	// 	currentFilters,
	// } = useFilters();

	const { data, isLoading, isError } = useQuery<Array<GQLFilterData>>({
		queryKey: ["filters"],
		queryFn: async (): Promise<Array<GQLFilterData>> => {
			try {
				const result = await graphqlClient.request<GQLFilterResponse>(
					filtersQuery,
					{}
				);
				return result.filters;
			} catch (err) {
				return Promise.reject(err);
			}
		},
		placeholderData: keepPreviousData,
	});

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (isError) {
		return null;
	}

	const filters = data ?? [];

	return (
		<div className={className}>
			{title ? <FilterTitle>{title}</FilterTitle> : null}
			<FilterContent>
				{/* {Object.entries(filters).map(([key, options]) => {
					const filterKey = key as FilterKeyType;
					return (
						<div key={key} className="flex items-center space-x-3">
							<FilterRowTitle className="flex-shrink-0 w-24">
								{FilterKeyTitle[filterKey]}
							</FilterRowTitle>
							<HorizontalScrollArea>
								{options.map((option) => (
									<FilterChip
										key={option}
										selected={Boolean(
											currentFilters[filterKey]?.includes(
												option
											)
										)}
										value={option}
										selectedIcon={chipIcon}
										onClick={() =>
											toggleOption(filterKey, option)
										}
									/>
								))}
							</HorizontalScrollArea>
							<Button
								variant="default"
								onClick={() => onReset(filterKey)}
								className="rounded-full"
							>
								Reset
							</Button>
						</div>
					);
				})} */}
				{filters.map((filter) => {
					const options: Array<string> = JSON.parse(filter.items);
					return (
						<div
							key={filter.name}
							className="flex items-center space-x-3"
						>
							<FilterRowTitle className="flex-shrink-0 w-24">
								{filter.name}
							</FilterRowTitle>
							<HorizontalScrollArea>
								{options.map((option) => (
									<FilterChip
										key={option}
										selected={
											// 	Boolean(
											// 	currentFilters[filterKey]?.includes(
											// 		option
											// 	)
											// )
											// TODO: make this to really check selected
											false
										}
										value={option}
										selectedIcon={chipIcon}
										onClick={() =>
											// toggleOption(filterKey, option)
											// TODO: make this to really toggle
											console.log(option)
										}
									/>
								))}
							</HorizontalScrollArea>
							<Button
								variant="default"
								onClick={() =>
									// onReset(filterKey)
									// TODO: make this to really reset
									console.log(filter.name)
								}
								className="rounded-full"
							>
								Reset
							</Button>
						</div>
					);
				})}
				<div className="flex place-content-between items-center space-x-2">
					<SearchInput wrapperClassName="md:w-1/3 lg:w-1/4" />

					<Button
						variant="default"
						onClick={onResetAll}
						className="rounded-full w-fit"
					>
						Reset All
					</Button>
				</div>
			</FilterContent>
		</div>
	);
}
