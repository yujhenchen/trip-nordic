import { IconButton } from "@/components/common/iconButton";
import { H3 } from "@/components/typography/h3";
import { Input } from "@/components/ui/input";
import { MODE, useEditableMode } from "@/hooks/useEditableMode";
import { CheckIcon, X } from "lucide-react";
import { useRef } from "react";

interface Props {
	text: string;
	handleSave?: (value: string) => void;
}

export function EditableHeading3({ text, handleSave }: Props) {
	const { mode, edit, save, cancel } = useEditableMode();
	const inputRef = useRef<HTMLInputElement | null>(null);
	return (
		<>
			{mode === MODE.VIEW ? (
				<H3 onDoubleClick={edit}>{text}</H3>
			) : (
				<div className="flex items-center">
					<Input
						ref={(node) => {
							inputRef.current = node;
						}}
						id="trip-name-id"
						defaultValue={text}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSave?.(inputRef.current?.value ?? text);
								save();
							}
						}}
					/>
					<IconButton
						icon={<CheckIcon />}
						onClick={() => {
							handleSave?.(inputRef.current?.value ?? text);
							save();
						}}
					/>
					<IconButton icon={<X />} onClick={cancel} />
				</div>
			)}
		</>
	);
}
