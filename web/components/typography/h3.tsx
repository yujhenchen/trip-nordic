import { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {}
export function H3({ children, ...rest }: Props) {
	return (
		<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight" {...rest}>
			{children}
		</h3>
	);
}
