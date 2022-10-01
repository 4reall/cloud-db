import {
	ComponentPropsWithoutRef,
	HTMLProps,
	PropsWithChildren,
	useEffect,
	useRef,
	useState,
} from 'react';
import clsx from 'clsx';
import Portal from 'components/Portal';
import { Transition } from '@headlessui/react';

export interface OverlayProps extends ComponentPropsWithoutRef<'div'> {
	isOpen: boolean;
	duration?: '200' | '300' | '500';
	backgroundOpacity?: number;
}

const durationMap = {
	'200': 'duration-200',
	'300': 'duration-300',
	'500': 'duration-500',
};

const Overlay = ({
	children,
	isOpen,
	className,
	duration = '300',
	backgroundOpacity,
	...props
}: PropsWithChildren<OverlayProps>) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		if (!isOpen) {
			timeout = setTimeout(() => setShow(false), +duration);
			document.body.removeAttribute('style');
		} else {
			document.body.style.overflow = 'hidden';
			setShow(true);
		}

		return () => clearTimeout(timeout);
	}, [isOpen]);

	return (
		<>
			{(isOpen || show) && (
				<Portal>
					<Transition
						show={show && isOpen}
						// appear
						enter="transition ease-out"
						enterFrom="opacity-0"
						enterTo="opacity-1"
						leave="transition ease-out"
						leaveFrom="opacity-1"
						leaveTo="opacity-0"
						style={{
							backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})`,
						}}
						className={clsx(
							'fixed left-0 top-0 h-screen w-screen select-none bg-black bg-opacity-50',
							className,
							durationMap[duration]
						)}
						{...props}
					>
						{children}
					</Transition>
				</Portal>
			)}
		</>
	);
};

export default Overlay;
