import {
	useKeepActivities,
	useKeepActivitiesActions,
} from "@/states/useActivityKeepStore";
import type { Activity } from "@/types/explore";

export const useActivityKeeps = () => {
	const keeps = useKeepActivities();
	const { addKeep, unKeep } = useKeepActivitiesActions();
	const handleOnKeep = (activity: Activity) => {
		const foundKeep = keeps.find((keep) => keep.id === activity.id);

		if (foundKeep) {
			unKeep(foundKeep.id);
		} else {
			addKeep(activity);
		}
	};

	return {
		keeps,
		handleOnKeep,
	};
};
