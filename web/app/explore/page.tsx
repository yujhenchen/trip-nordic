import { FilterProvider } from "./FilterProvider";
import { Content } from "./content";
import { testFilters } from "./data/filterTestData";

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
