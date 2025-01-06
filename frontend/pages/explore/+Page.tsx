import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Filter,
  FilterContent,
  FilterOption,
  FilterRow,
  FilterTitle,
} from "./Filter";

export default function Page() {
  return (
    <div>
      <Filter>
        <FilterTitle>Filter Title</FilterTitle>
        <FilterContent>
          <FilterRow>
            <FilterOption>Filter Row 1 1</FilterOption>
            <FilterOption>Filter Row 1 2</FilterOption>
            <FilterOption>Filter Row 1 3</FilterOption>
          </FilterRow>

          <FilterRow>
            <FilterOption>Filter Row 2 1</FilterOption>
            <FilterOption>Filter Row 2 2</FilterOption>
          </FilterRow>
        </FilterContent>
      </Filter>

      <CardWrapper />
    </div>
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
