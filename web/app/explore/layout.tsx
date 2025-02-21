import { DialogProvider } from "@/components/providers/DialogProvider";
import { PageContainer } from "@/components/common/PageContainer";

export default function ExploreLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<DialogProvider>
			<PageContainer>{children}</PageContainer>
		</DialogProvider>
	);
}
