import Link from "next/link";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Link> {}

export function NavLink({ href, children, ...rest }: Props) {
	return (
		<Link href={href} {...rest}>
			{children}
		</Link>
	);
}
