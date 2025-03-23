import { Label } from "../ui/label";
import { AppProgress } from "./appProgress";
import { Overlay } from "./overlay";

interface Props {
	message?: string;
	callback?: () => void;
	callbackDelay?: number;
}

export function RedirectOverlay({ message, callback, callbackDelay }: Props) {
	return (
		<Overlay>
			{message ? <Label className="text-white">{message}</Label> : null}
			<AppProgress
				defaultProgress={0}
				finalProgress={100}
				duration={1500}
				callback={callback}
				callbackDelay={callbackDelay}
			/>
		</Overlay>
	);
}
