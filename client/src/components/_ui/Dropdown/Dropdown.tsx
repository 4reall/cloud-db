import { Children, PropsWithChildren, ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import clsx from 'clsx';

import MenuButton from 'components/_ui/Dropdown/MenuButton';
import MenuItem from 'components/_ui/Dropdown/MenuItem';

interface DropdownMenuProps {
	renderButton: ReactNode;
}

const Dropdown = ({
	children,
	renderButton,
}: PropsWithChildren<DropdownMenuProps>) => {
	return (
		<Menu>
			<div className={clsx('relative z-30 inline-block')}>
				<MenuButton>{renderButton}</MenuButton>
				<Menu.Items
					as="ul"
					className={clsx(
						'absolute left-0 z-20 mt-2 w-56 md:right-0 md:left-auto',
						'rounded-md bg-gray-100 py-2 shadow-xl',
						'dark:bg-gray-700'
					)}
				>
					{Children.map(children, (child) => (
						<MenuItem>{child}</MenuItem>
					))}
				</Menu.Items>
			</div>
		</Menu>
	);
};

export default Dropdown;
