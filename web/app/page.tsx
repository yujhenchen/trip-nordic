import { TypographyH1 } from "@/components/typography/H1";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="flex flex-col gap-10">
			<TypographyH1
				text="Plan Your Next Nordic Adventure"
				className="flex justify-center"
			/>
			<div className="flex gap-6 w-full place-content-center">
				<Button variant="link" size="lg" className="rounded-xl">
					Plan
				</Button>
				<Button variant="link" size="lg" className="rounded-xl">
					Explore
				</Button>
			</div>
		</div>
	);
}
