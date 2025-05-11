import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/providers/SidebarProvider";
import {
	PanelBottomOpen,
	PanelLeftOpen,
	PanelRightOpen,
	PanelTopOpen,
} from "lucide-react";
import { useMediaQuery } from "react-responsive";
import {
	type ChangeEvent,
	type JSX,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
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

const includedKeyword = (value: string, keyword: string) =>
	value.toLowerCase().includes(keyword.toLowerCase());

const searchAbleFields: Array<keyof Activity> = [
	"name",
	"description",
	"city",
	"region",
	"seasons",
	"categories",
];

function Content() {
	const isMobile = useIsMobile();
	const [keyword, setKeyword] = useState<string>("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	};

	if (isMobile) {
		return (
			<HorizontalScrollArea>
				<SearchInput
					wrapperClassName="sticky -top-8 left-2"
					value={keyword}
					onChange={handleChange}
				/>
				<Keeps isMobile={isMobile} searchKeyword={keyword} />
			</HorizontalScrollArea>
		);
	}

	return (
		<ScrollArea className="px-4 pb-4 pt-8">
			<SearchInput
				wrapperClassName="sticky top-0 mb-4"
				value={keyword}
				onChange={handleChange}
			/>
			<Keeps isMobile={isMobile} searchKeyword={keyword} />
		</ScrollArea>
	);
}

function Keeps({
	isMobile,
	searchKeyword,
}: {
	isMobile: boolean;
	searchKeyword: string;
}) {
	const mobileProps = {
		className: "w-48",
		titleClassName: "truncate",
	};
	const { open } = useDialog();
	const { keeps, handleOnKeep } = useActivityKeeps();
	const focusCardIdRef = useRef<string>("");
	const focusCardRef = useRef<HTMLDivElement>(null);

	const filteredKeeps = useMemo(
		() =>
			keeps.filter((keep) =>
				searchAbleFields.some(
					(field) =>
						typeof keep[field] === "string" &&
						includedKeyword(keep[field], searchKeyword),
				),
			),
		[keeps, searchKeyword],
	);

	useEffect(() => {
		if (keeps.length === 0) {
			return;
		}
		focusCardRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "center",
			inline: "center",
		});
	}, [keeps]);

	const handleClickCard = (elementId: string, activity: Activity) => {
		if (elementId === IDS.KEEP_ICON) {
			handleOnKeep(activity);
			return;
		}
		const { id, city, categories, region, seasons } = activity;

		focusCardIdRef.current = id;
		open("DetailsDialog", {
			headerImage: {
				src: "https://placehold.co/300x200",
				alt: "",
			},
			activity,
			tags: [city, ...categories, region, ...seasons],
		});
	};

	return filteredKeeps.map((keepActivity) => {
		const { id, name, description } = keepActivity;
		return (
			<SidebarCard
				key={id}
				cardRef={(node) => {
					if (focusCardIdRef.current === id && node) {
						focusCardRef.current = node;
					}
				}}
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
				"overflow-hidden",
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
