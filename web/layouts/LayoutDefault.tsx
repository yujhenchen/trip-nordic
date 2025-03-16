import "./style.css";

import "./tailwind.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type React from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const queryClient = new QueryClient();

export default function LayoutDefault({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ThemeProvider>
			<div className={"flex flex-col min-h-screen"}>
				<Header />
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
				<Footer />
				<Toaster />
			</div>
		</ThemeProvider>
	);
}
