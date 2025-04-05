import { ClipboardCopy, Save } from "lucide-react";
import { IconButton } from "@/components/common/iconButton";
import { toast } from "sonner";
import { EditableHeading3 } from "./EditableHeading3";
import { DatePickerWithRange } from "@/components/common/datePickerWithRange";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

export function ControlPanel() {
	const now = new Date();
	const [date, setDate] = useState<DateRange | undefined>({
		from: now,
		to: addDays(now, 3),
	});
	return (
		<div className="w-full h-16 place-content-between flex border px-8 py-1 items-center">
			<EditableHeading3 text="My Trip Name" />
			<DatePickerWithRange date={date} setDate={setDate} />
			<div className="flex space-x-6">
				<IconButton icon={<Save />} onClick={() => toast.success("Saved")} />
				<IconButton
					icon={<ClipboardCopy />}
					onClick={() => toast.success("Copied")}
				/>
			</div>
		</div>
	);
}
