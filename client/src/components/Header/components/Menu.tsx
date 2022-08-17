import { PropsWithChildren, useEffect, useState } from 'react';
import clsx from 'clsx';

interface MenuProps {
	isOpen: boolean;
}

const Menu = ({ isOpen, children }: PropsWithChildren<MenuProps>) => {
	const [overflow, setOverflow] = useState(false);

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		if (isOpen) timeout = setTimeout(() => setOverflow(true), 300);
		else {
			setOverflow(false);
		}

		return () => {
			clearTimeout(timeout);
		};
	}, [isOpen]);

	return (
		<div
			className={clsx(
				'flex-1 md:flex md:items-center md:justify-between',
				'transition-all duration-300',
				isOpen ? 'max-h-screen' : 'max-h-0',
				overflow
					? 'overflow-y-visible'
					: 'overflow-y-hidden md:overflow-visible'
			)}
		>
			{children}
		</div>
	);
};

export default Menu;
