import { useEffect } from 'react';

export const useDebouncedRippleCleanUp = (
	rippleCount: number,
	duration: number,
	cleanUpFunction: () => void
) => {
	useEffect(() => {
		let bounce: ReturnType<typeof setTimeout> | undefined;
		if (rippleCount > 0) {
			// noinspection JSUnusedAssignment
			clearTimeout(bounce);

			bounce = setTimeout(() => {
				cleanUpFunction();
				clearTimeout(bounce);
			}, duration);
		}

		return () => clearTimeout(bounce);
	}, [rippleCount, duration, cleanUpFunction]);
};
