import { ClipboardCopy, Save } from "lucide-react";
import { IconButton } from "@/components/common/iconButton";
import { toast } from "sonner";
import { EditableHeading3 } from "./EditableHeading3";
import { DatePickerWithRange } from "@/components/common/datePickerWithRange";

export function ControlPanel() {
	return (
		<div className="w-full h-16 place-content-between flex border px-8 py-1 items-center">
			<EditableHeading3 text="My Trip Name" />
			<DatePickerWithRange />
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
