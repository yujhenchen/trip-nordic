import "./style.css";

import "./tailwind.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type React from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";

const queryClient = new QueryClient();

export default function LayoutDefault({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ThemeProvider>
			<div className={"flex flex-col min-h-screen"}>
				<QueryClientProvider client={queryClient}>
					<Header />
					{children}
					<Footer />
					<Toaster />
				</QueryClientProvider>
			</div>
		</ThemeProvider>
	);
}
