import { FilterProvider } from "./FilterProvider";
import { Content } from "./content";
import { testFilters } from "./data/filterTestData";

export default function Page() {
	return (
		<FilterProvider filters={testFilters}>
			<Content />
		</FilterProvider>
	);
}
