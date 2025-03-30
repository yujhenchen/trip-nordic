import { useState } from "react";

export const MODE = {
	EDIT: "EDIT",
	VIEW: "VIEW",
} as const;

type ModeType = keyof typeof MODE;

export function useEditableMode() {
	const [mode, setMode] = useState<ModeType>(MODE.VIEW);

	const edit = () => {
		setMode(MODE.EDIT);
	};

	const save = () => {
		setMode(MODE.VIEW);
	};

	const cancel = () => {
		setMode(MODE.VIEW);
	};

	return {
		mode,
		edit,
		save,
		cancel,
	};
}
