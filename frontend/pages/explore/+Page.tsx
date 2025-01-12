import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FilterPanel from "./FilterPanel";
import testFilterPanelRows from "./filterTestData";
import { X } from "lucide-react";

export default function Page() {
  return (
    <>
      <FilterPanel rows={testFilterPanelRows} chipIcon={<X size={16} />} />

      <CardWrapper />
    </>
  );
}

function CardWrapper() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 15 }, (_, i) => (
        <Card>
          <CardHeader>
            <img src="https://via.placeholder.com/150x100" alt="Card Image" />
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          {/* <CardContent>
            <p>Card Content</p>
          </CardContent> */}
          {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
        </Card>
      ))}
    </div>
  );
}
