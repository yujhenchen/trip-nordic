import {
  FilterContent,
  FilterOptionsContainer,
  FilterRow,
  FilterRowTitle,
  FilterTitle,
} from "./Filter";
import FilterChip from "./FilterChip";

export interface Props {
  title?: string;
  rows: FilterPanelRow[];
  chipIcon: React.ReactNode;
  className?: string;
}

export interface FilterPanelRow {
  title: string;
  options: FilterPanelOption[];
}

export interface FilterPanelOption {
  isSelected: boolean;
  value: string;
}

export default function FilterPanel({
  title,
  rows,
  chipIcon,
  className,
}: Props) {
  return (
    <div className={className}>
      {title ? <FilterTitle>{title}</FilterTitle> : null}
      <FilterContent>
        {rows.map((row) => (
          <FilterRow>
            <FilterRowTitle className="flex-shrink-0 w-24">
              {row.title}
            </FilterRowTitle>
            <FilterOptionsContainer>
              {row.options.map((option) => (
                <FilterChip
                  selected={option.isSelected}
                  value={option.value}
                  selectedIcon={chipIcon}
                />
              ))}
            </FilterOptionsContainer>
          </FilterRow>
        ))}
      </FilterContent>
    </div>
  );
}
