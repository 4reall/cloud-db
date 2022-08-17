import { PropsWithChildren } from 'react';
import { Menu } from '@headlessui/react';
import clsx from 'clsx';

const MenuButton = ({ children }: PropsWithChildren<{}>) => {
	return (
		<Menu.Button
			as="span"
			className={clsx(
				'relative flex items-end rounded-md p-2 focus:outline-none',
				'overflow-hidden dark:text-gray-200 md:hover:text-blue-700',
				'duration-200 md:hover:dark:text-white'
			)}
			aria-label="toggle profile dropdown"
		>
			{children}
		</Menu.Button>
	);
};

export default MenuButton;
