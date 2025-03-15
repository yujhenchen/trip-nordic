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
import { IconButton } from "@/components/common/IconButton";

export function Sidebar() {
	const { sidebarOpen } = useSidebar();
	return (
		<div
			className={cn(
				"border md:h-full flex place-content-center md:place-content-end",
				{
					"w-full h-1/4 md:w-1/6": sidebarOpen,
				},
				{
					"w-full h-6 md:w-6": !sidebarOpen,
				},
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
