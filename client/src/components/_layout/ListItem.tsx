import { PropsWithChildren } from 'react';
import clsx from 'clsx';

const ListItem = ({ children }: PropsWithChildren<{}>) => {
	return (
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
	);
};

export default ListItem;
