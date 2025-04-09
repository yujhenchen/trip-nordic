import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/providers/SidebarProvider";
import {
	PanelBottomOpen,
	PanelLeftOpen,
	PanelRightOpen,
	PanelTopOpen,
} from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { type JSX, useEffect, useMemo, useState } from "react";
import { IconButton } from "@/components/common/iconButton";
import useKeepStore from "@/states/useKeepStore";
import { SidebarCard } from "./sidebarCard";
import { activityTestData } from "../explore/data/activityTestData";
import { SearchInput } from "@/components/common/searchInput";
import { ScrollArea } from "@/components/ui/scroll-area";

function Content() {
	const { keeps } = useKeepStore();
	const showSearch = keeps.length > 0;

	return (
		<ScrollArea className="px-4 pb-4 pt-8">
			{showSearch && <SearchInput className="sticky top-0 mb-4" />}
			{keeps.map((keep) => {
				const activity = activityTestData.find((a) => a.id === keep);
				if (!activity) {
					return null;
				}
				return (
					<SidebarCard
						key={activity.id}
						title={activity.name}
						description={activity.description}
					/>
				);
			})}
		</ScrollArea>
	);
}

export function PlanSidebar() {
	const { sidebarOpen } = useSidebar();
	return (
		<div
			className={cn(
				"flex place-content-center md:place-content-end",
				"border md:h-full",
				"transition-all duration-300 ease-in-out",
				sidebarOpen
					? "w-full min-h-[25vh] md:w-1/3 xl:w-1/4"
					: "w-full h-6 md:w-6",
			)}
		>
			<Content />
			<ToggleButton />
		</div>
	);
}

function ToggleButton() {
	const { sidebarOpen, toggleSidebar } = useSidebar();
	const isTabletOrBigger = useMediaQuery({ query: "(min-width: 768px)" });
	const [icon, setIcon] = useState<JSX.Element | null>(null);
	const openIcon = useMemo(
		() => (isTabletOrBigger ? <PanelRightOpen /> : <PanelTopOpen />),
		[isTabletOrBigger],
	);

	const closeIcon = useMemo(
		() => (isTabletOrBigger ? <PanelLeftOpen /> : <PanelBottomOpen />),
		[isTabletOrBigger],
	);

	useEffect(() => {
		setIcon(sidebarOpen ? openIcon : closeIcon);
	}, [sidebarOpen, openIcon, closeIcon]);
	return <IconButton icon={icon} onClick={toggleSidebar} />;
}
