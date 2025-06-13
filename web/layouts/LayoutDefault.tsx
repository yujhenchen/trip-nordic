import "./style.css";

import "./tailwind.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type React from "react";
import { usePageContext } from "vike-react/usePageContext";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { cn } from "@/lib/utils";
import { ROUTE_PATHS, routePaths } from "@/types/shared";

const queryClient = new QueryClient();

export default function LayoutDefault({
	children,
}: {
	children: React.ReactNode;
}) {
	const pageContext = usePageContext();

	const showBgImg = routePaths.includes(pageContext.routePath);

	const showHeader = routePaths.includes(pageContext.routePath);

	const { PLAN, EXPLORE, ...rest } = ROUTE_PATHS;
	const showFooter = (Object.values(rest) as Array<string>).includes(
		pageContext.routePath,
	);

	const { HOME, ...restExcludeHome } = ROUTE_PATHS;
	const showHeaderMore = (
		Object.values(restExcludeHome) as Array<string>
	).includes(pageContext.routePath);

	return (
		<ThemeProvider>
			<div
				className={cn("flex flex-col min-h-screen", {
					"bg-cover bg-center": showBgImg,
				})}
				{...(showBgImg && {
					style: {
						backgroundImage: `url(${pageContext.bgImgClass})`,
					},
				})}
			>
				<QueryClientProvider client={queryClient}>
					{showHeader && (
						<Header showLogo={showHeaderMore} showNavMenu={showHeaderMore} />
					)}
					{children}
					{showFooter && (
						<Footer
							showHome={!showHeader}
							showModeToggle={!showHeader}
							showProfile={!showHeader}
						/>
					)}
					<Toaster />
				</QueryClientProvider>
			</div>
		</ThemeProvider>
	);
}
