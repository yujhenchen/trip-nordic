import clsx from "clsx";

export function TypographyH1({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <h1
      className={clsx(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {text}
    </h1>
  );
}
