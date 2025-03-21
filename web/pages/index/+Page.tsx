import { H1 } from "@/components/typography/H1";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/common/pageContainer";
import { NavLink } from "@/components/common/navLink";

export default function Page() {
	return (
		<PageContainer>
			<H1
				text="Plan Your Next Nordic Adventure"
				className="flex justify-center"
			/>
			<div className="flex gap-6 w-full place-content-center pt-12">
				<Button variant="link" size="lg" className="rounded-xl">
					<NavLink href="/plan">Plan</NavLink>
				</Button>
				<Button variant="link" size="lg" className="rounded-xl">
					<NavLink href="/explore">Explore</NavLink>
				</Button>
			</div>
		</PageContainer>
	);
}
