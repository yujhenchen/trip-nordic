import { DialogProvider } from "@/components/providers/DialogProvider";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <DialogProvider>{children}</DialogProvider>;
}
