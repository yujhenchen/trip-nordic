import { FilterProvider } from "./FilterProvider";
import { Content } from "./content";

export default function Page() {
	return (
		<FilterProvider>
			<Content />
		</FilterProvider>
	);
}
