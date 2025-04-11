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
	name: string;
	date: AppDateRange;
	onClose: () => void;
	handleUpdateTrip: (newTripProps: NewTrip) => void;
}

const IDS = {
	NAME_INPUT: "name-input",
	DATES_RANGE: "dates-range",
};

export default function EditTripDialog({
	name,
	date,
	onClose,
	handleUpdateTrip,
}: Props) {
	const [currentDate, setCurrentDate] = useState<AppDateRange>(date);

	const nameRef = useRef<HTMLInputElement | null>(null);

	const save = () => {
		const tripName = nameRef.current?.value ?? "";
		handleUpdateTrip({
			name: tripName,
			date: currentDate ?? date,
		});
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
								defaultValue={name}
							/>
						</div>

						<div className="flex items-center space-x-2">
							<Label htmlFor={IDS.DATES_RANGE}>Dates</Label>
							<DatePickerWithRange
								id={IDS.DATES_RANGE}
								date={currentDate}
								onSelectDate={(
									range,
									_selectedDay,
									_activeModifiers,
									_e
								) => {
									if (range?.from && range.to) {
										setCurrentDate({
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
						<Button onClick={save}>Save</Button>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
