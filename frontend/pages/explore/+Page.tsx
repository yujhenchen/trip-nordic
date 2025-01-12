import FilterPanel from "./FilterPanel";
import { testFilters } from "./filterTestData"; // TODO: replace with real data
import { X } from "lucide-react";
import CardGrid, { CardProps } from "./CardGrid";
import { activityTestData } from "./activityTestData";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FilterOptionData,
  FilterProvider,
  useFilterProvider,
} from "./FilterProvider";

export interface Activity {
  id: string;
  category: string;
  city: string;
  description: string;
  name: string;
  region: string;
  seasons: string;
  img?: {
    src: string;
    alt: string;
  };
}

export default function Page() {
  return (
    <FilterProvider filters={testFilters}>
      <Content />
    </FilterProvider>
  );
}

function Content() {
  const { filters, updateFilters } = useFilterProvider();

  const cards: Array<CardProps> = activityTestData.map((activity) => {
    return {
      id: activity.id,
      onClick: () => {
        console.log("clicked card");
      },
      children: (
        <CardHeader>
          <img
            src={activity.img?.src ?? "https://via.placeholder.com/150x100"}
            alt={activity.img?.alt ?? "Card Image"}
          />
          <CardTitle>{activity.name}</CardTitle>
          <CardDescription>{activity.description}</CardDescription>
        </CardHeader>
      ),
    };
  });

  const handleClickOption = (rowStr: string, option: FilterOptionData) => {
    const row = filters.find((filter) => filter.title === rowStr);
    const newOptions =
      row?.options.map((o) =>
        o.value === option.value ? { ...o, isSelected: !o.isSelected } : o
      ) ?? [];
    updateFilters(rowStr, newOptions);
  };

  return (
    <>
      <FilterPanel
        filters={filters}
        chipIcon={<X size={16} />}
        onClickOption={handleClickOption}
      />

      <CardGrid
        cards={cards}
        // TODO: filters={filters}
      />
    </>
  );
}
