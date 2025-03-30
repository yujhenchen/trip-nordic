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
