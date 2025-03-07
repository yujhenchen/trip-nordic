"use client";

import { nanoid } from "nanoid";
import {
	type ComponentProps,
	type JSX,
	Suspense,
	createContext,
	useCallback,
	useContext,
	useState,
} from "react";
import { DialogManager, DialogProps, type DialogType } from "./DialogManager";

interface DialogProviderProps {
	children: React.ReactNode;
}

type DialogStructure = {
	id: string;
	component: () => JSX.Element;
};

interface DialogProviderState {
	activeDialogs: Array<DialogStructure>;
	open: (
		dialogType: DialogType,
		props: Omit<
			ComponentProps<(typeof DialogManager)[typeof dialogType]>,
			"onClose"
		>
	) => void;
	close: (dialogId: string) => void;
}

const initialState: DialogProviderState = {
	activeDialogs: [],
	open: () => {},
	close: () => {},
};

const DialogProviderContext = createContext<DialogProviderState>(initialState);

export function DialogProvider({ children, ...props }: DialogProviderProps) {
	const [activeDialogs, setActiveDialogs] = useState<Array<DialogStructure>>(
		[]
	);
	const close = useCallback((dialogId: string) => {
		setActiveDialogs((prevDialogs) =>
			prevDialogs.filter((dialog) => dialog.id !== dialogId)
		);
	}, []);

	const open = useCallback(
		(dialogType: DialogType, props: DialogProps) => {
			const dialogId = nanoid();
			const Component = DialogManager[dialogType];
			const newActiveDialog = {
				id: dialogId,
				component: () => (
					// FIXME
					<Component {...props} onClose={() => close(dialogId)} />
				),
			};

			setActiveDialogs((prevDialogs) => [
				...prevDialogs,
				newActiveDialog,
			]);
			return null;
		},
		[close]
	);
	const value = {
		activeDialogs,
		open,
		close,
	};

	return (
		<DialogProviderContext.Provider value={value} {...props}>
			{children}
			<Suspense fallback={null}>
				{value.activeDialogs?.map(({ id, component: LazyDialog }) => (
					<LazyDialog key={id} />
				))}
			</Suspense>
		</DialogProviderContext.Provider>
	);
}

export const useDialog = () => {
	const context = useContext(DialogProviderContext);

	if (context === undefined)
		throw new Error("useDialog must be used within a DialogProvider");

	return context;
};
