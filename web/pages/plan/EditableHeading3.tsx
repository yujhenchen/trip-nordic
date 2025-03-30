import { IconButton } from "@/components/common/iconButton";
import { H3 } from "@/components/typography/h3";
import { Input } from "@/components/ui/input";
import { MODE, useEditableMode } from "@/hooks/useEditableMode";
import { CheckIcon, X } from "lucide-react";

interface Props {
	text: string;
}

export function EditableHeading3({ text }: Props) {
	const { mode, edit, save, cancel } = useEditableMode();
	return (
		<>
			{mode === MODE.VIEW ? (
				<H3 onDoubleClick={edit}>{text}</H3>
			) : (
				<div className="flex items-center">
					<Input
						id="trip-name-id"
						defaultValue={text}
						onKeyDown={(e) => e.key === "Enter" && save()}
					/>
					<IconButton icon={<CheckIcon />} onClick={save} />
					<IconButton icon={<X />} onClick={cancel} />
				</div>
			)}
		</>
	);
}
