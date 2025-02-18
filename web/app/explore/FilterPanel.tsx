import { Button } from "@/components/ui/button";
import {
	FilterContent,
	FilterOptionsContainer,
	FilterRow,
	FilterRowTitle,
	FilterTitle,
	FilterChip,
} from "./Filter";
import { type FilterKeyType, FilterKeyTitle } from "./types";
import { useFilters } from "./FilterProvider";

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

export function FilterPanel({
	title,
	chipIcon,
	className,
	toggleOption,
	onReset,
	onResetAll,
}: Props) {
	const { filters, currentFilters } = useFilters();
	return (
		<div className={className}>
			{title ? <FilterTitle>{title}</FilterTitle> : null}
			<FilterContent>
				{Object.entries(filters).map(([key, options]) => {
					const filterKey = key as FilterKeyType;
					return (
						<FilterRow key={key}>
							<FilterRowTitle className="flex-shrink-0 w-24">
								{FilterKeyTitle[filterKey]}
							</FilterRowTitle>
							<FilterOptionsContainer>
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
							</FilterOptionsContainer>
							<Button
								variant="default"
								onClick={() => onReset(filterKey)}
								className="rounded-full"
							>
								Reset
							</Button>
						</FilterRow>
					);
				})}
				<Button
					variant="default"
					onClick={onResetAll}
					className="rounded-full w-fit"
				>
					Reset All
				</Button>
			</FilterContent>
		</div>
	);
}
