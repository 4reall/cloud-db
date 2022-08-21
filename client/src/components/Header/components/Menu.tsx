import { PropsWithChildren } from 'react';
import Overlay from 'components/_layout/Overlay';
import { Transition } from '@headlessui/react';

const Menu = ({ isOpen, children }: PropsWithChildren<MenuProps>) => {
	return (
		<Transition
			show={isOpen}
			className="z-50 flex-1 overflow-hidden md:overflow-visible"
			enter="transition-all duration-300"
			enterFrom="max-h-0"
			enterTo="max-h-screen"
			leave="transition-all duration-300"
			leaveFrom="max-h-screen"
			leaveTo="max-h-0"
		>
			{children}
			<Overlay className="md:hidden" isOpen={isOpen} />
		</Transition>
	);
};

interface MenuProps {
	isOpen: boolean;
}

export default Menu;
