"use client";

import { ClipboardCopy, Save } from "lucide-react";
import { IconButton } from "@/components/common/IconButton";
import { useToast } from "@/hooks/use-toast";

export function ControlPanel() {
	const { toast } = useToast();

	return (
		<div className="w-full h-16 place-content-end flex space-x-4 border px-8 items-center">
			<IconButton
				icon={<Save />}
				onClick={() =>
					toast({
						title: "Saved",
					})
				}
			/>
			<IconButton
				icon={<ClipboardCopy />}
				onClick={() =>
					toast({
						title: "Copied",
					})
				}
			/>
		</div>
	);
}
