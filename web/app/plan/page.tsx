import { Content } from "./content";
import { Sidebar } from "./Sidebar";

export default function PlanPage() {
	return (
		<div className="flex grow">
			<Sidebar />
			<Content />
		</div>
	);
}
