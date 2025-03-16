import { LoadingSpinner } from "../ui/loading-spinner";

export function LoadingOverlay() {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<LoadingSpinner variant="default" />
		</div>
	);
}
