import { LoadingSpinner } from "../ui/loading-spinner";
import { Overlay } from "./overlay";

export function LoadingOverlay() {
	return (
		<Overlay>
			<LoadingSpinner variant="default" />
		</Overlay>
	);
}
