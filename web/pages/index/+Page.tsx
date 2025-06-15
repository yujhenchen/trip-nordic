import { PageContainer } from "@/components/common/pageContainer";
import { H1 } from "@/components/typography/h1";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/common/navLink";
import { defaultTrip, useTrips } from "@/states/useTripsState";

const HEADING_TEXT = "Plan Your Next Adventure";

function NavButtons() {
	const trips = useTrips();

	const items = [
		{
			href:
				trips.length > 0 ? `/plan/${trips[0].id}` : `/plan/${defaultTrip.id}`,
			text: "Plan",
		},
		{ href: "/explore", text: "Explore" },
	];
	return items.map((item) => (
		<Button
			key={item.href}
			variant="secondary"
			size="lg"
			className="rounded-full shadow-lg"
		>
			<NavLink href={item.href}>{item.text}</NavLink>
		</Button>
	));
}

export default function Page() {
	return (
		<PageContainer className="items-center justify-center">
			<div className="relative">
				<p
					className={cn(
						"scroll-m-20 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight",
						"absolute inset-0 pointer-events-none",
						"text-gray-200/80 dark:text-gray-800/80",
						"scale-105 blur-xl",
					)}
				>
					{HEADING_TEXT}
				</p>
				<H1
					text={HEADING_TEXT}
					className={cn("drop-shadow-lg", "text-gray-50")}
				/>
			</div>

			<div className="flex gap-6 w-full place-content-center pt-12">
				<NavButtons />
			</div>
		</PageContainer>
	);
}
