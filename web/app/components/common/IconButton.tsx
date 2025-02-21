import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
	icon: React.ReactNode;
}

export function IconButton({ icon, className, ...rest }: Props) {
	return (
		<button type="button" className={cn("w-fit h-fit", className)} {...rest}>
			{icon}
		</button>
	);
}
