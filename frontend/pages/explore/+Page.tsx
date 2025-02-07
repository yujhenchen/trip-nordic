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
import DetailsDialog from "./DetailsDialog";

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
      <DetailsDialog
        headerImage={{
          src: "https://placehold.co/300x200",
          alt: "",
        }}
        title={"Pottery House Anubis"}
        description={
          "Pottery House Anubis. In the heart of the Glass Capital Iittala, in the Green House, the naive artist Markku Mäki has a pottery house and store with a warm welcome. Anubis is the place to admire and buy naive sculpture, high-fired ceramics and Finnish hand-made knives. You can follow the artist´s work in his workshop every day."
        }
        tags={["A", "B", "C"]}
      />
    </FilterProvider>
  );
}

function Content() {
  const { filters, updateFilters } = useFilterProvider();

  const cards: Array<CardProps> = activityTestData
    .filter((data) => {
      // TODO: get  selected filters in each filter, if empty array, do not filter that property
      return data;
    })
    .map((activity) => {
      return {
        id: activity.id,
        onClick: () => {
          console.log("clicked card");
        },
        children: (
          <CardHeader>
            <img
              src={activity.img?.src ?? "https://placehold.co.com/150x100"}
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

  const handleReset = () => {
    // TODO: make all isSelected false
  };

  return (
    <>
      <FilterPanel
        filters={filters}
        chipIcon={<X size={16} />}
        onClickOption={handleClickOption}
        onReset={handleReset}
      />

      <CardGrid cards={cards} />
    </>
  );
}
