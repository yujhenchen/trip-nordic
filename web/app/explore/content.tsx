"use client";

import { X } from "lucide-react";
import { CardGrid, CardProps } from "./CardGrid";
import { CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { FilterOptionData, useFilterProvider } from "./FilterProvider";
import { useDialog } from "../components/providers/DialogProvider";
import { activityTestData } from "./activityTestData";
import { FilterPanel } from "./FilterPanel";

export function Content() {
  const { filters, updateFilters } = useFilterProvider();
  const { open } = useDialog();

  const cards: Array<CardProps> = activityTestData
    .filter((data) => {
      // TODO: get  selected filters in each filter, if empty array, do not filter that property
      return data;
    })
    .map((activity) => {
      return {
        id: activity.id,
        onClick: () => {
          open("DetailsDialog", {
            headerImage: {
              src: "https://placehold.co/300x200",
              alt: "",
            },
            title: activity.name,
            description: activity.description,
            tags: ["A", "B", "C"],
          });
        },
        children: (
          <CardHeader>
            <img
              src={activity.img?.src ?? "https://placehold.co/150x100"}
              alt={activity.img?.alt ?? "Card Image"}
            />
            <CardTitle>{activity.name}</CardTitle>
            <CardDescription className=" line-clamp-3">
              {activity.description}
            </CardDescription>
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
