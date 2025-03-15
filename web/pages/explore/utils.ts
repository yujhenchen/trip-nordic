export const anySourceElementInTarget = (
	source: Array<string>,
	target: Array<string>,
): boolean => source.some((item) => target.includes(item));
