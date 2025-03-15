import { SidebarProvider } from "@/components/providers/SidebarProvider";
import { Content } from "./content";
import { Sidebar } from "./Sidebar";

export default function PlanPage() {
	return (
		<div className="flex flex-col md:flex-row-reverse h-[calc(100vh-6rem-5.5rem)]">
			<Content />
			<SidebarProvider>
				<Sidebar />
			</SidebarProvider>
		</div>
	);
}
