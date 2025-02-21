import { Button } from "../components/ui/button";

export function ControlPanel() {
	return (
		<div className="w-full h-1/8 place-content-end flex space-x-2 bg-yellow-300">
			<Button variant="link" size="lg" className="rounded-xl">
				Save icon
			</Button>
			<Button variant="link" size="lg" className="rounded-xl">
				Copy to clipboard icon
			</Button>
		</div>
	);
}
