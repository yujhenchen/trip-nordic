import { Progress } from "@/components/ui/progress";
import { type ComponentProps, useEffect, useState } from "react";
import { set } from "react-hook-form";

interface Props extends ComponentProps<typeof Progress> {
	defaultProgress: number;
	finalProgress: number;
	duration: number;
	callback?: () => void;
	callbackDelay?: number;
}

export function AppProgress({
	defaultProgress,
	finalProgress,
	duration,
	callback,
	callbackDelay,
	...rest
}: Props) {
	const [progress, setProgress] = useState(defaultProgress);

	useEffect(() => {
		const timer = setTimeout(() => {
			setProgress(finalProgress);

			if (callback && callbackDelay) {
				const cbTimer = setTimeout(() => {
					callback();
					clearTimeout(cbTimer);
				}, callbackDelay);
			}
		}, duration);

		return () => clearTimeout(timer);
	}, [callback, duration, finalProgress, callbackDelay]);

	return <Progress value={progress} className="w-[60%]" {...rest} />;
}
