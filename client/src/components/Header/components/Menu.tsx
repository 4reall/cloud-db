import { PropsWithChildren, useEffect, useState } from 'react';
import Overlay from 'components/_layout/Overlay';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';

interface MenuProps {
	isOpen: boolean;
}

const Menu = ({ isOpen, children }: PropsWithChildren<MenuProps>) => {
	return (
		<Transition
			show={isOpen}
			className={clsx('z-50 flex-1')}
			enter="transition-all duration-300"
			enterFrom="max-h-0 overflow-hidden"
			enterTo="max-h-screen overflow-visible"
			// afterEnter={() => setHidden(false)}
			leave="transition-all duration-300"
			leaveFrom="max-h-screen overflow-visible"
			leaveTo="max-h-0 overflow-hidden"
			// beforeLeave={() => setHidden(true)}
		>
			{children}
			<Overlay isOpen={isOpen} />
		</Transition>
	);
};

export default Menu;
