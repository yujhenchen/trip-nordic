import type { DateRange } from "react-day-picker";
import { EditableHeading3 } from "./editableHeading3";
import { DatePickerWithRange } from "@/components/common/datePickerWithRange";

interface Props {
	name: string;
	date: DateRange | undefined;
	updateName: (name: string) => void;
	updateDate: (date: DateRange | undefined) => void;
}

export function TripInfoBlock({ name, date, updateDate }: Props) {
	return (
		<>
			<EditableHeading3 text={name} />
			<DatePickerWithRange date={date} setDate={updateDate} />
		</>
	);
}
