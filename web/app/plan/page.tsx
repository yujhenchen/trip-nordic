import { SidebarProvider } from "@/components/providers/SidebarProvider";
import { Content } from "./content";
import { Sidebar } from "./Sidebar";

export default function PlanPage() {
	return (
		<div className="flex flex-col md:flex-row-reverse grow">
			<Content />
			<SidebarProvider>
				<Sidebar />
			</SidebarProvider>
		</div>
	);
}
