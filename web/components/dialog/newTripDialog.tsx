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
import type { NewTrip } from "@/types/trips";
import type { AppDateRange } from "@/types/shared";

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
	const [date, setDate] = useState<AppDateRange>({
		from: now,
		to: now,
	});

	const nameRef = useRef<HTMLInputElement | null>(null);

	const create = () => {
		const tripName = nameRef.current?.value ?? "";
		const tripDate = date ?? {
			from: now,
			to: now,
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
								onSelectDate={(range, _selectedDay, _activeModifiers, _e) => {
									if (range?.from && range.to) {
										setDate({
											from: range.from,
											to: range.to,
										});
									}
								}}
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
