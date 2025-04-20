import type { Activity } from "@/types/explore";
import { createKeepStore } from "./store-factory";

const useActivityKeepStore = createKeepStore<Activity>("activity");

export const useKeepActivities = () =>
	useActivityKeepStore((state) => state.keeps);
export const useKeepActivitiesActions = () =>
	useActivityKeepStore((state) => state.actions);
