import { cn } from "@/lib/utils";
import { usePageContext } from "vike-react/usePageContext";

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
      className={cn(isActive ? "is-active" : undefined, className)}
    >
      {children}
    </a>
  );
}
