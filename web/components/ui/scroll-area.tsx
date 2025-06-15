import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

// const ScrollArea = React.forwardRef<
// 	React.ElementRef<typeof ScrollAreaPrimitive.Root>,
// 	React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
// >(({ className, children, ...props }, ref) => (
// 	<ScrollAreaPrimitive.Root
// 		ref={ref}
// 		className={cn("relative overflow-hidden", className)}
// 		{...props}
// 	>
// 		<ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
// 			{children}
// 		</ScrollAreaPrimitive.Viewport>
// 		<ScrollBar />
// 		<ScrollAreaPrimitive.Corner />
// 	</ScrollAreaPrimitive.Root>
// ));

type ScrollAreaProps = React.ComponentPropsWithoutRef<
	typeof ScrollAreaPrimitive.Root
> & {
	fullHeight?: boolean;
};
const ScrollArea = React.forwardRef<
	React.ElementRef<typeof ScrollAreaPrimitive.Root>,
	ScrollAreaProps
>(({ className, children, fullHeight = false, ...props }, ref) => {
	const innerRef = React.useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		const firstChild = innerRef.current?.querySelector(
			"[data-radix-scroll-area-viewport]"
		)?.firstElementChild as HTMLElement | null;

		if (firstChild) {
			firstChild.style.display = "block";
		}
	}, []);
	// NOTE: custom changes to make viewport first div full height
	const viewportRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		if (!fullHeight) {
			return;
		}
		if (viewportRef.current) {
			const firstChild = viewportRef.current
				.firstElementChild as HTMLElement | null;

			if (firstChild) {
				firstChild.style.height = "100%";
			}
		}
	}, [fullHeight]);

	return (
		<ScrollAreaPrimitive.Root
			ref={(node) => {
				innerRef.current = node;
				if (typeof ref === "function") {
					ref(node);
				} else if (ref) {
					(
						ref as React.MutableRefObject<HTMLDivElement | null>
					).current = node;
				}
			}}
			className={cn("relative overflow-hidden", className)}
			{...props}
		>
			<ScrollAreaPrimitive.Viewport
				ref={viewportRef}
				className="h-full w-full rounded-[inherit]"
			>
				{children}
			</ScrollAreaPrimitive.Viewport>
			<ScrollBar />
			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	);
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
	React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
	React.ComponentPropsWithoutRef<
		typeof ScrollAreaPrimitive.ScrollAreaScrollbar
	>
>(({ className, orientation = "vertical", ...props }, ref) => (
	<ScrollAreaPrimitive.ScrollAreaScrollbar
		ref={ref}
		orientation={orientation}
		className={cn(
			"flex touch-none select-none transition-colors",
			orientation === "vertical" &&
				"h-full w-2.5 border-l border-l-transparent p-[1px]",
			orientation === "horizontal" &&
				"h-2.5 flex-col border-t border-t-transparent p-[1px]",
			className
		)}
		{...props}
	>
		<ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
	</ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
