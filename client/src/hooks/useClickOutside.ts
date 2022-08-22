import { RefObject, useEffect } from 'react';
import { assertIsNode } from 'utils/assertion/assertIsNode';
import { current } from '@reduxjs/toolkit';

export const useClickOutside = (ref: RefObject<any>, callback: () => void) => {
	const handleClick = (e: MouseEvent): void => {
		assertIsNode(e.target);
		if (ref.current && !ref.current.contains(e.target)) {
			callback();
		}
	};
	useEffect(() => {
		document.addEventListener('click', handleClick);
		document.addEventListener('contextmenu', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
			document.removeEventListener('contextmenu', handleClick);
		};
	});
};
