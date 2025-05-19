import { Button } from "@/components/ui/button";
import {
	FilterContent,
	FilterRowTitle,
	FilterTitle,
	FilterChip,
} from "./Filter";
import { SearchInput } from "@/components/common/searchInput";
import { HorizontalScrollArea } from "@/components/common/horizontalScrollArea";
import type {
	GQLFilterResponse,
	FilterKeyType,
	ActivityFilters,
} from "@/types/explore";
import { useData } from "vike-react/useData";
import type { ChangeEvent, ComponentProps } from "react";
import { CustomSelect } from "@/components/common/customSelect";

export interface Props {
	selectedFilters: ActivityFilters;
	title?: string;
	className?: string;
	searchKeyword?: string;
	toggleOption: (filterKey: FilterKeyType, option: string) => void;
	onReset: (filterKey: FilterKeyType) => void;
	onResetAll: () => void;
	handleSearchChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	handleChangeCities: ComponentProps<typeof CustomSelect>["onChange"];
}

export interface FilterPanelRow {
	title: string;
	options: Array<string>;
}

export function FilterPanel({
	selectedFilters,
	title,
	className,
	searchKeyword,
	toggleOption,
	onReset,
	onResetAll,
	handleSearchChange,
	handleChangeCities,
}: Props) {
	const filters = useData<GQLFilterResponse["fiActivityFilters"]>();

	const options =
		filters
			.find((filter) => filter.name === "cities")
			?.items.map((item) => ({ value: item, label: item })) || [];

	return (
		<div className={className}>
			{title ? <FilterTitle>{title}</FilterTitle> : null}

			<FilterContent>
				<FilterRowTitle className="flex-shrink-0 w-24">
					Cities
				</FilterRowTitle>
				<CustomSelect
					options={options}
					isMulti
					onChange={handleChangeCities}
				/>
			</FilterContent>

			<FilterContent>
				{filters.map((filter) => {
					const filterKey = filter.name;
					return (
						<div
							key={filterKey}
							className="flex items-center space-x-3"
						>
							<FilterRowTitle className="flex-shrink-0 w-24">
								{filterKey}
							</FilterRowTitle>
							<HorizontalScrollArea>
								{filter.items.map((option) => (
									<FilterChip
										key={option}
										selected={Boolean(
											selectedFilters[
												filterKey
											]?.includes(option)
										)}
										value={option}
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
				})}
				<div className="flex place-content-between items-center space-x-2">
					<SearchInput
						wrapperClassName="md:w-1/3 lg:w-1/4"
						value={searchKeyword}
						onChange={handleSearchChange}
					/>

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
