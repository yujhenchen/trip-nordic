import { testFilters } from "./filterTestData"; // TODO: replace with real data

import { FilterProvider } from "./FilterProvider";
import { PageContent } from "./pageContent";

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
      <PageContent />
    </FilterProvider>
  );
}
