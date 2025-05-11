import { Button } from "@/components/ui/button";
import {
	FilterContent,
	FilterRowTitle,
	FilterTitle,
	FilterChip,
} from "./Filter";
import { SearchInput } from "@/components/common/searchInput";
import { HorizontalScrollArea } from "@/components/common/horizontalScrollArea";
import {
	type GQLFilterResponse,
	type FilterKeyType,
	FilterKeyTitle,
} from "@/types/explore";
import { useData } from "vike-react/useData";
import { useFilters } from "./FilterProvider";

export interface Props {
	// chipIcon: React.ReactNode;
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

export function FilterPanel({
	title,
	// chipIcon,
	className,
	toggleOption,
	onReset,
	onResetAll,
}: Props) {
	const { selectedFilters } = useFilters();
	const filters = useData<GQLFilterResponse["filters"]>();

	return (
		<div className={className}>
			{title ? <FilterTitle>{title}</FilterTitle> : null}
			<FilterContent>
				{filters.map((filter) => {
					const options: Array<string> = JSON.parse(filter.items);
					const filterKey = filter.name;
					return (
						<div key={filterKey} className="flex items-center space-x-3">
							<FilterRowTitle className="flex-shrink-0 w-24">
								{FilterKeyTitle[filterKey]}
							</FilterRowTitle>
							<HorizontalScrollArea>
								{options.map((option) => (
									<FilterChip
										key={option}
										selected={Boolean(
											selectedFilters[filterKey]?.includes(option),
										)}
										value={option}
										// selectedIcon={chipIcon}
										onClick={() => toggleOption(filterKey, option)}
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
