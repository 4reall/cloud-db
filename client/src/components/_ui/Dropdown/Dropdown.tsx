import {
	Children,
	ComponentPropsWithoutRef,
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

interface DropdownMenuProps extends ComponentPropsWithoutRef<'div'> {
	trigger: ReactNode;
	isOpen: boolean;
	align?: 'left' | 'right' | 'center';
	children: ReactNode | ReactNode[];
}

const alignMap = {
	left: 'left-0',
	right: 'right-0',
	center: 'left-1/2 -translate-x-1/2',
};

const Dropdown = forwardRef<HTMLDivElement, DropdownMenuProps>(
	(
		{
			children,
			trigger,
			isOpen,
			className,
			color,
			align = 'left',
			...props
		},
		ref
	) => {
		const [zIndex, setZIndex] = useState(0);
		return (
			<Menu
				ref={ref}
				as="div"
				className={clsx('inline-block', className)}
				{...props}
				style={{ zIndex: zIndex }}
			>
				{({ open }) => (
					<>
						{trigger}
						<Transition
							show={isOpen}
							enter="transition duration-200 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-1"
							leave="transition duration-150 ease-out"
							leaveFrom="transform scale-100 opacity-1"
							leaveTo="transform scale-95 opacity-0"
							beforeEnter={() => setZIndex(1000)}
						>
							<Menu.Items
								static
								as="ul"
								className={clsx(
									'absolute z-50 mt-2 w-56 rounded-md py-2 shadow-xl',
									color,
									alignMap[align]
								)}
							>
								{Children.map(children, (child) => (
									<Menu.Item as={'li'}>
										<span className="block h-full w-full md:hover:backdrop-brightness-95 md:hover:dark:backdrop-brightness-110">
											{child}
										</span>
									</Menu.Item>
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
