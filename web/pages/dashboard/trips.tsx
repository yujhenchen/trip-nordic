import { IconButton } from "@/components/common/iconButton";
import { useDialog } from "@/components/providers/DialogProvider";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import useTripState from "@/states/useTripState";
import { Plus } from "lucide-react";

export function Trips() {
	const { trips } = useTripState();
	return (
		<div>
			{trips.map((trip) => (
				<Card key={trip.id}>
					<CardHeader>
						<CardTitle>{trip.name}</CardTitle>
						<CardDescription>Card Description</CardDescription>
					</CardHeader>
					<CardContent>
						<p>Card Content</p>
					</CardContent>
					<CardFooter>
						<p>Card Footer</p>
					</CardFooter>
				</Card>
			))}
			<NewTrip />
		</div>
	);
}

function NewTrip() {
	const { open } = useDialog();

	const handleAdd = () => {
		open("NewTripDialog", {});
	};

	return (
		<Card className="h-20 aspect-video flex place-content-center items-center overflow-hidden">
			<IconButton icon={<Plus />} onClick={handleAdd} />
		</Card>
	);
}
