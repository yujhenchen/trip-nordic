import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { AppProgress } from "./AppProgress";

interface Props {
	message: string;
	callback?: () => void;
	callbackDelay?: number;
}

export function RedirectOverlay({ message, callback, callbackDelay }: Props) {
	return (
		<div
			className={cn(
				"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50",
				"flex flex-col space-y-4",
			)}
		>
			<Label className="text-white">{message}</Label>
			<AppProgress
				defaultProgress={0}
				finalProgress={100}
				duration={1500}
				callback={callback}
				callbackDelay={callbackDelay}
			/>
		</div>
	);
}
