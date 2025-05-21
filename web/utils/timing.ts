export function debounce(callback: (...args: Array<unknown>) => void, delay: number): (...args: Array<unknown>) => void {
	let timer: NodeJS.Timeout | undefined = undefined;
	return function (...args: Array<unknown>) {
		clearTimeout(timer);
		timer = setTimeout(() => callback(...args), delay);
	}
}

export function throttle() { }
