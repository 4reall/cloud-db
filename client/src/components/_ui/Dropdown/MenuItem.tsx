import clsx from 'clsx';
import { Menu } from '@headlessui/react';
import { PropsWithChildren } from 'react';

const MenuItem = ({ children }: PropsWithChildren) => {
	return (
		<Menu.Item>
			<li
				className={clsx(
					'block transform px-4 py-3',
					'text-sm capitalize text-gray-600',
					'transition-colors duration-200',
					'hover:bg-gray-200 dark:text-gray-300',
					'dark:hover:bg-gray-600 dark:hover:text-white'
				)}
			>
				{children}
			</li>
		</Menu.Item>
	);
};

export default MenuItem;
