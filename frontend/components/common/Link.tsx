import { usePageContext } from "vike-react/usePageContext";
import { clsx } from "clsx/lite";

export function Link({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: string;
}) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const isActive =
    href === "/" ? urlPathname === href : urlPathname.startsWith(href);
  return (
    <a
      href={href}
      className={clsx(isActive ? "is-active" : undefined, className)}
    >
      {children}
    </a>
  );
}
