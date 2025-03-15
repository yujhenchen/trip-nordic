import { createContext, useContext, useState } from "react";

type SidebarContextType = {
	sidebarOpen: boolean;
	toggleSidebar: () => void;
};

const initialState: SidebarContextType = {
	sidebarOpen: false,
	toggleSidebar: () => {},
};

const SidebarContext = createContext(initialState);

interface Props {
	children: React.ReactNode;
}

export function SidebarProvider({ children }: Props) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const value = {
		sidebarOpen,
		toggleSidebar,
	};

	return (
		<SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
	);
}

export const useSidebar = () => {
	return useContext(SidebarContext);
};
