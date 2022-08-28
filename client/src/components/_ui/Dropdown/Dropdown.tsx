import {
	Children,
	ForwardedRef,
	forwardRef,
	HTMLAttributes,
	PropsWithChildren,
	ReactNode,
	useState,
} from 'react';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';

import MenuItem from 'components/_ui/Dropdown/MenuItem';
import IconButton from 'components/_ui/_buttons/IconButton';

type DropdownMenuProps = PropsWithChildren<{
	button?: {
		icon: ReactNode;
		label: string;
		onClick: () => void;
	};
	isOpen: boolean;
	align?: 'left' | 'right' | 'center';
}> &
	HTMLAttributes<HTMLDivElement>;

const alignMap = {
	left: 'left-0',
	right: 'right-0',
	center: 'left-1/2 -translate-x-1/2',
};

const Dropdown = forwardRef(
	(
		{
			children,
			button,
			isOpen,
			className,
			align = 'left',
			...props
		}: DropdownMenuProps,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		return (
			<Menu
				ref={ref}
				as="div"
				className={clsx('relative z-30 inline-block', className)}
				{...props}
			>
				{({ open }) => (
					<>
						{button && (
							<IconButton
								className={clsx(
									'rounded-md text-black dark:text-gray-200'
									// 'py-2 px-4'
								)}
								{...button}
								full
								ripple
							/>
						)}
						<Transition
							show={isOpen}
							enter="transition duration-200 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-1"
							leave="transition duration-150 ease-out"
							leaveFrom="transform scale-100 opacity-1"
							leaveTo="transform scale-95 opacity-0"
						>
							<Menu.Items
								static
								as="ul"
								className={clsx(
									'absolute z-20 w-56 rounded-md py-2',
									'bg-gray-100 shadow-xl dark:bg-gray-700',
									button && 'mt-2',
									alignMap[align]
								)}
							>
								{Children.map(children, (child) => (
									<MenuItem>{child}</MenuItem>
								))}
							</Menu.Items>
						</Transition>
					</>
				)}
			</Menu>
		);
	}
);

export default Dropdown;
