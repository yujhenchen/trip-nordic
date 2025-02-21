"use client";

import { Plus } from "lucide-react";

import { IconButton } from "@/components/common/IconButton";
import { PanelContainer } from "./PanelContainer";
import { useToast } from "@/hooks/use-toast";

export function PanelNew() {
	const { toast } = useToast();

	return (
		<PanelContainer className="place-content-center items-center h-20 overflow-hidden">
			<IconButton
				icon={<Plus />}
				onClick={() => toast({ title: "New panel added" })}
			/>
		</PanelContainer>
	);
}
