import { Button } from "@/components/ui/button";
import {
  FilterContent,
  FilterOptionsContainer,
  FilterRow,
  FilterRowTitle,
  FilterTitle,
  FilterChip,
} from "./Filter";
import { FilterOptionData, FiltersType } from "./FilterProvider";

export interface Props {
  filters: FiltersType;
  chipIcon: React.ReactNode;
  onClickOption: (row: string, option: FilterOptionData) => void;
  onReset: () => void;
  title?: string;
  className?: string;
}

export interface FilterPanelRow {
  title: string;
  options: Array<FilterOptionData>;
}

export default function FilterPanel({
  title,
  filters,
  chipIcon,
  className,
  onClickOption,
  onReset,
}: Props) {
  return (
    <div className={className}>
      {title ? <FilterTitle>{title}</FilterTitle> : null}
      <FilterContent>
        {filters.map((row) => (
          <FilterRow key={row.title}>
            <FilterRowTitle className="flex-shrink-0 w-24">
              {row.title}
            </FilterRowTitle>
            <FilterOptionsContainer>
              {row.options.map((option) => (
                <FilterChip
                  key={option.value}
                  selected={option.isSelected}
                  value={option.value}
                  selectedIcon={chipIcon}
                  onClick={() => onClickOption(row.title, option)}
                />
              ))}
            </FilterOptionsContainer>
            <Button variant="secondary" onClick={onReset}>
              Reset
            </Button>
          </FilterRow>
        ))}
      </FilterContent>
    </div>
  );
}
