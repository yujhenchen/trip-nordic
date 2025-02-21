import { Content } from "./content";
import { Sidebar } from "./Sidebar";

export default function PlanPage() {
	return (
		<div className="flex flex-nowrap flex-1 w-full h-full bg-gray-500">
			<Sidebar />
			<Content />
		</div>
	);
}
