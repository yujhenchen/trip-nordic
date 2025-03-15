import { DialogProvider } from "@/components/providers/DialogProvider";

export default function PlanLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <DialogProvider>{children}</DialogProvider>;
}
