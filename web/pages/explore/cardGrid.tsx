import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { MouseEvent } from "react";
import { useActivityKeeps } from "@/hooks/use-activity-keeps";
import type { Activity } from "@/types/explore";
import { IDS } from "@/utils/ids";
import { Bookmark } from "lucide-react";

interface Props {
	activities: Array<Activity>;
	handleClickCard: (event: MouseEvent) => (activity: Activity) => void;
}

export function CardGrid({ activities, handleClickCard }: Props) {
	const { keeps } = useActivityKeeps();

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
				.map((activity) => (
					<Card
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
									keeps.find(
										(keep) => keep.id === activity.id
									)
										? "currentColor"
										: "none"
								}
							/>
							<img
								// src={
								// 	activity.img?.src ??
								// 	"https://placehold.co/150x100"
								// }
								// alt={activity.img?.alt ?? "Card Image"}
								src="https://placehold.co/150x100"
								alt="Card"
							/>
							<CardTitle className="line-clamp-2">
								{activity.name}
							</CardTitle>
							<CardDescription className="line-clamp-3">
								{activity.description}
							</CardDescription>
						</CardHeader>
					</Card>
				))}
		</div>
	);
}
