import { PageContainer } from "@/components/common/pageContainer";
import { H1 } from "@/components/typography/h1";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/common/navLink";

export default function Page() {
	return (
		<PageContainer className="items-center justify-center">
			<div className="relative">
				<p
					className={cn(
						"scroll-m-20 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight",
						"absolute inset-0 pointer-events-none",
						"text-gray-200/80 dark:text-gray-800/80",
						"scale-105 blur-xl"
					)}
				>
					Plan Your Next Adventure
				</p>
				<H1
					text="Plan Your Next Adventure"
					className={cn("drop-shadow-lg")}
				/>
			</div>

			<div className="flex gap-6 w-full place-content-center pt-12">
				<Button variant="secondary" size="lg" className="rounded-full">
					<NavLink href="/plan">Plan</NavLink>
				</Button>
				<Button variant="secondary" size="lg" className="rounded-full">
					<NavLink href="/explore">Explore</NavLink>
				</Button>
			</div>
		</PageContainer>
	);
}
