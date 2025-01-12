import FilterPanel from "./FilterPanel";
import testFilterPanelRows from "./filterTestData"; // TODO: replace with real data
import { X } from "lucide-react";
import CardGrid, { CardProps } from "./CardGrid";
import { activityTestData } from "./activityTestData";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
  const cards: Array<CardProps> = activityTestData.map((activity) => {
    return {
      id: activity.id,
      onClick: () => {
        console.log("clicked");
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

  return (
    <>
      <FilterPanel rows={testFilterPanelRows} chipIcon={<X size={16} />} />

      <CardGrid cards={cards} />
    </>
  );
}
