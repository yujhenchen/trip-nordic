import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DatePickerWithRange } from "../common/datePickerWithRange";
import { useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { NewTrip } from "@/types/trips";

interface Props {
	onClose: () => void;
	handleNewTrip: (newTripProps: NewTrip) => void;
}

const IDS = {
	NAME_INPUT: "name-input",
	DATES_RANGE: "dates-range",
};

export default function NewTripDialog({ onClose, handleNewTrip }: Props) {
	const now = new Date();
	const [date, setDate] = useState<DateRange | undefined>({
		from: now,
		to: addDays(now, 3),
	});

	const nameRef = useRef<HTMLInputElement | null>(null);

	const create = () => {
		const tripName = nameRef.current?.value ?? "";
		const tripDate = date ?? {
			from: now,
			to: addDays(now, 3),
		};
		handleNewTrip({ name: tripName, date: tripDate });
		onClose();
	};

	return (
		<Dialog open onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader className="py-4">
					<DialogTitle>New Trip</DialogTitle>
					<DialogDescription className="space-y-4 py-8">
						<div className="flex items-center space-x-2">
							<Label htmlFor={IDS.NAME_INPUT}>Name</Label>
							<Input
								id={IDS.NAME_INPUT}
								ref={(node) => {
									nameRef.current = node;
								}}
								placeholder="Trip name"
							/>
						</div>

						<div className="flex items-center space-x-2">
							<Label htmlFor={IDS.DATES_RANGE}>Dates</Label>
							<DatePickerWithRange
								id={IDS.DATES_RANGE}
								date={date}
								setDate={setDate}
							/>
						</div>
					</DialogDescription>
					<div className="w-full flex space-x-4 justify-center">
						<Button variant="secondary" onClick={onClose}>
							Cancel
						</Button>
						<Button onClick={create}>Create</Button>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
