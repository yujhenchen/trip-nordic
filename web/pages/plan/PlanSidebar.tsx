import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/providers/SidebarProvider";
import {
	PanelBottomOpen,
	PanelLeftOpen,
	PanelRightOpen,
	PanelTopOpen,
} from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { type ChangeEvent, type JSX, useEffect, useMemo, useState } from "react";
import { IconButton } from "@/components/common/iconButton";
import { SidebarCard } from "./sidebarCard";
import { SearchInput } from "@/components/common/searchInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { HorizontalScrollArea } from "@/components/common/horizontalScrollArea";
import { useActivityKeeps } from "@/hooks/use-activity-keeps";
import { IDS } from "@/utils/ids";
import type { Activity } from "@/types/explore";
import { useDialog } from "@/components/providers/DialogProvider";

function Content() {
	const { keeps } = useActivityKeeps();
	const isMobile = useIsMobile();
	const showSearch = keeps.length > 0;
	const [keyword, setKeyword] = useState<string>("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	};

	const filteredKeeps = useMemo(() => {
		return keeps.filter(
			(keep) =>
				keep.name.toLowerCase().includes(keyword.toLowerCase()) ||
				keep.description.toLowerCase().includes(keyword.toLowerCase()) ||
				keep.city.toLowerCase().includes(keyword.toLowerCase()) ||
				keep.region.toLowerCase().includes(keyword.toLowerCase()) ||
				keep.seasons.toLowerCase().includes(keyword.toLowerCase()) ||
				keep.category.toLowerCase().includes(keyword.toLowerCase()),
		);
	}, [keeps, keyword]);

	if (isMobile) {
		return (
			<HorizontalScrollArea>
				<Keeps isMobile={isMobile} filteredKeeps={filteredKeeps} />
			</HorizontalScrollArea>
		);
	}

	return (
		<ScrollArea className="px-4 pb-4 pt-8">
			{showSearch && (
				<SearchInput
					wrapperClassName="sticky top-0 mb-4"
					value={keyword}
					onChange={handleChange}
				/>
			)}
			<Keeps isMobile={isMobile} filteredKeeps={filteredKeeps} />
		</ScrollArea>
	);
}

function Keeps({
	isMobile,
	filteredKeeps,
}: {
	isMobile: boolean;
	filteredKeeps: Array<Activity>;
}) {
	const mobileProps = {
		className: "w-48",
		titleClassName: "truncate",
	};
	const { open } = useDialog();
	const { handleOnKeep } = useActivityKeeps();

	const handleClickCard = (elementId: string, activity: Activity) => {
		if (elementId === IDS.KEEP_ICON) {
			handleOnKeep(activity);
			return;
		}
		const { city, category, region, seasons } = activity;
		open("DetailsDialog", {
			// keeps,
			// handleKeep: handleOnKeep,
			// (activity: Activity) => {
			// 	const foundKeep = keeps.find(
			// 		(keep) => keep.id === activity.id
			// 	);

			// 	if (foundKeep) {
			// 		unKeep(foundKeep.id);
			// 	} else {
			// 		addKeep(activity);
			// 	}
			// },
			headerImage: {
				src: "https://placehold.co/300x200",
				alt: "",
			},
			activity,
			tags: [
				city,
				// TODO: perform default split with comma for API response
				...category.split(","),
				region,
				...seasons.split(","),
			],
		});
	};

	return filteredKeeps.map((keepActivity) => {
		const { id, name, description } = keepActivity;
		return (
			<SidebarCard
				key={id}
				title={name}
				description={description}
				handleClick={(e) => {
					e.stopPropagation();
					handleClickCard(e.currentTarget.id, keepActivity);
				}}
				{...(isMobile ? mobileProps : {})}
			/>
		);
	});
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
