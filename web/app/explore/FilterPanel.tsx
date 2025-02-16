import { Button } from "@/components/ui/button";
import {
	FilterContent,
	FilterOptionsContainer,
	FilterRow,
	FilterRowTitle,
	FilterTitle,
	FilterChip,
} from "./Filter";
import type { FilterOptionType, FiltersType } from "./types";

export interface Props {
	filters: FiltersType;
	chipIcon: React.ReactNode;
	toggleOption: (key: string, option: FilterOptionType) => void;
	onReset: (key: string) => void;
	onResetAll: () => void;
	title?: string;
	className?: string;
}

export interface FilterPanelRow {
	title: string;
	options: Array<FilterOptionType>;
}

export function FilterPanel({
	title,
	filters,
	chipIcon,
	className,
	toggleOption,
	onReset,
	onResetAll,
}: Props) {
	return (
		<div className={className}>
			{title ? <FilterTitle>{title}</FilterTitle> : null}
			<FilterContent>
				{Object.entries(filters).map(([key, options]) => (
					<FilterRow key={key}>
						<FilterRowTitle className="flex-shrink-0 w-24">
							{key}
						</FilterRowTitle>
						<FilterOptionsContainer>
							{options.map((option) => (
								<FilterChip
									key={option.value}
									selected={option.isSelected}
									value={option.value}
									selectedIcon={chipIcon}
									onClick={() => toggleOption(key, option)}
								/>
							))}
						</FilterOptionsContainer>
						<Button
							variant="default"
							onClick={() => onReset(key)}
							className="rounded-full"
						>
							Reset
						</Button>
					</FilterRow>
				))}
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
