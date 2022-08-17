import { useEffect } from 'react';

export const useDarkMode = () => {
	useEffect(() => {
		let mode;
		if (
			localStorage.getItem('theme') === 'dark' ||
			(window.matchMedia('(prefers-color-scheme: dark)').matches &&
				!localStorage.getItem('theme'))
		) {
			mode = 'dark';
		} else {
			mode = 'light';
		}

		localStorage.setItem('theme', mode);

		document.documentElement.className = mode;
	}, []);
};
