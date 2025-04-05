import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { contentSections, ItemLabelKeyType, menuItems } from "./data";

export function Content() {
	const isMobile = useIsMobile();
	const [activeItem, setActiveItem] = useState<ItemLabelKeyType>("profile");

	return (
		<SidebarProvider>
			<div className="flex grow">
				{/* Updated sidebar classnames to not cover shared layout */}
				<Sidebar className="h-full border-r">
					<SidebarHeader>
						<div className="flex h-14 items-center px-4">
							<h2 className="text-lg font-semibold">
								My Dashboard
							</h2>
						</div>
					</SidebarHeader>
					<SidebarContent className="h-full">
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.id}>
									<SidebarMenuButton
										isActive={activeItem === item.id}
										onClick={() => setActiveItem(item.id)}
									>
										<item.icon className="h-5 w-5" />
										<span>{item.label}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarContent>
				</Sidebar>

				<div className="flex-1">
					<header className="flex h-14 items-center border-b px-6">
						{isMobile ? <SidebarTrigger className="mr-2" /> : null}
						<h1 className="text-xl font-semibold">
							{contentSections[activeItem].title}
						</h1>
					</header>
					<section className="p-6">
						<div className="rounded-lg border p-6">
							<h2 className="mb-4 text-2xl font-semibold">
								{contentSections[activeItem].title}
							</h2>
							<p>{contentSections[activeItem].content}</p>
						</div>
					</section>
				</div>
			</div>
		</SidebarProvider>
	);
}
