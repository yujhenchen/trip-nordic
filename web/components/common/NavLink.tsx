import type { AnchorHTMLAttributes } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export function NavLink({ href, children, ...rest }: Props) {
	return (
		<a href={href} {...rest}>
			{children}
		</a>
	);
}
