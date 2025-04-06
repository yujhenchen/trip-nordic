import { ClipboardCopy, Save } from "lucide-react";
import { IconButton } from "@/components/common/iconButton";
import { toast } from "sonner";
import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export function ControlPanel({ children }: Props) {
	return (
		<div className="w-full h-16 place-content-between flex border px-8 py-1 items-center">
			{children}
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
