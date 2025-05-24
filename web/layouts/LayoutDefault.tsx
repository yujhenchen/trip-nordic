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

const queryClient = new QueryClient();

export default function LayoutDefault({
	children,
}: {
	children: React.ReactNode;
}) {
	const pageContext = usePageContext();

	const isHome = pageContext.pageType === "home";

	return (
		<ThemeProvider>
			<div
				className={cn(
					"flex flex-col min-h-screen",
					isHome ? `${pageContext.randomBgClass} bg-cover bg-center` : "",
				)}
			>
				<QueryClientProvider client={queryClient}>
					<Header showLogo={!isHome} showNavMenu={!isHome} />
					{children}
					<Footer />
					<Toaster />
				</QueryClientProvider>
			</div>
		</ThemeProvider>
	);
}
