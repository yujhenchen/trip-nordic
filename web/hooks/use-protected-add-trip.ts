import { useDialog } from "@/components/providers/DialogProvider";
import { useTrips, useTripsActions } from "@/states/useTripsState";
import type { Trip } from "@/types/trips";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

const VITE_MAX_TRIPS_GUEST = import.meta.env.VITE_MAX_TRIPS_GUEST;

export const useProtectedAddTrip = () => {
	const { open } = useDialog();
	const pageContext = usePageContext();
	const trips = useTrips();
	const { addTrip } = useTripsActions();

	const protectedAddTrip = (
		newTrip: Trip,
		successCallback?: () => void,
		failedCallback?: () => void,
	) => {
		if (!pageContext.user) {
			if (trips.length >= VITE_MAX_TRIPS_GUEST) {
				open("AppAlertDialog", {
					title: "You’ve reached your saved trips limit! Log in to save more.",
					handleConfirm: () => {
						navigate("/login");
					},
				});

				return failedCallback?.();
			}
		}
		addTrip(newTrip);
		successCallback?.();
	};

	return protectedAddTrip;
};
