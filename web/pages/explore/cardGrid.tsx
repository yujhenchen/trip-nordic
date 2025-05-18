import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useCallback, useRef, type MouseEvent } from "react";
import { useActivityKeeps } from "@/hooks/use-activity-keeps";
import type { Activity, ActivityQueryParams } from "@/types/explore";
import { IDS } from "@/utils/ids";
import { Bookmark } from "lucide-react";
import { SkeletonCard } from "@/components/common/skeletonCard";

interface Props {
	isFetching: boolean;
	isLoading: boolean;
	activities: Array<Activity>;
	totalCount: number;
	handleClickCard: (event: MouseEvent) => (activity: Activity) => void;
	setQueryObject: React.Dispatch<React.SetStateAction<ActivityQueryParams>>;
}

export function CardGrid({
	isFetching,
	isLoading,
	activities,
	totalCount,
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
						setQueryObject((prev) => {
							// NOTE: offset should never be equal to or greater than totalCount
							const nextOffset = prev.offset + prev.limit;
							const maxOffset = Math.min(
								nextOffset,
								totalCount - 1
							);
							return {
								...prev,
								offset: maxOffset,
							};
						});
					}
				}
				// {
				// 	threshold: 1.0,
				// },
			);
			if (node) {
				observer.current.observe(node);
			}
		},
		[isLoading, totalCount, setQueryObject]
	);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{activities.map((activity, index) => (
				<Card
					ref={
						index === activities.length - 1 ? lastElementRef : null
					}
					key={activity.id}
					id={activity.id}
					onClick={(event) => handleClickCard(event)(activity)}
				>
					<CardHeader>
						<Bookmark
							id={IDS.KEEP_ICON}
							className="self-end"
							onClick={(event) =>
								handleClickCard(event)(activity)
							}
							fill={
								keeps.find((keep) => keep.id === activity.id)
									? "currentColor"
									: "none"
							}
						/>
						<img src="https://placehold.co/150x100" alt="Card" />
						<CardTitle className="line-clamp-2">
							{activity.name}
						</CardTitle>
						<CardDescription className="line-clamp-3">
							{activity.description}
						</CardDescription>
					</CardHeader>
				</Card>
			))}
			{isFetching && <SkeletonCard />}
		</div>
	);
}
