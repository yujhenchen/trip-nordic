import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useCallback, useRef, type MouseEvent } from "react";
import { useActivityKeeps } from "@/hooks/use-activity-keeps";
import type { Activity } from "@/types/explore";
import { IDS } from "@/utils/ids";
import { Bookmark } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface Props {
	isFetching: boolean;
	isLoading: boolean;
	activities: Array<Activity>;
	handleClickCard: (event: MouseEvent) => (activity: Activity) => void;
	setQueryObject: React.Dispatch<
		React.SetStateAction<{
			offset: number;
			first: number;
		}>
	>;
}

export function CardGrid({
	isFetching,
	isLoading,
	activities,
	handleClickCard,
	setQueryObject,
}: Props) {
	const { keeps } = useActivityKeeps();

	const observer = useRef<IntersectionObserver | null>(null);

	const lastElementRef = useCallback(
		(node: HTMLDivElement) => {
			if (isLoading) {
				return;
			}
			if (observer.current) {
				observer.current.disconnect();
			}
			observer.current = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						setQueryObject((prev) => ({
							...prev,
							offset: prev.offset + prev.first,
						}));
					}
				},
				// {
				// 	threshold: 1.0,
				// },
			);
			if (node) {
				observer.current.observe(node);
			}
		},
		[isLoading, setQueryObject],
	);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{activities
				// .filter((activity) => {
				// 	const isCategoryMatch = isFilterMatch(
				// 		currentFilters,
				// 		"category",
				// 		activity.category.split(",")
				// 	);

				// 	const isCityMatch = isFilterMatch(
				// 		currentFilters,
				// 		"city",
				// 		activity.city.split(",")
				// 	);

				// 	const isRegionMatch = isFilterMatch(
				// 		currentFilters,
				// 		"region",
				// 		activity.region.split(",")
				// 	);

				// 	const isSeasonMatch = isFilterMatch(
				// 		currentFilters,
				// 		"seasons",
				// 		activity.seasons.split(",")
				// 	);

				// 	return (
				// 		isCategoryMatch &&
				// 		isCityMatch &&
				// 		isRegionMatch &&
				// 		isSeasonMatch
				// 	);
				// })
				.map((activity, index) => (
					<Card
						ref={index === activities.length - 1 ? lastElementRef : null}
						key={activity.id}
						id={activity.id}
						onClick={(event) => handleClickCard(event)(activity)}
					>
						<CardHeader>
							<Bookmark
								id={IDS.KEEP_ICON}
								className="self-end"
								onClick={(event) => handleClickCard(event)(activity)}
								fill={
									keeps.find((keep) => keep.id === activity.id)
										? "currentColor"
										: "none"
								}
							/>
							<img src="https://placehold.co/150x100" alt="Card" />
							<CardTitle className="line-clamp-2">{activity.name}</CardTitle>
							<CardDescription className="line-clamp-3">
								{activity.description}
							</CardDescription>
						</CardHeader>
					</Card>
				))}
			{isFetching && <LoadingSpinner />}
		</div>
	);
}
