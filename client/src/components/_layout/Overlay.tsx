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
	const timeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		if (!timeoutRef.current) clearTimeout(timeoutRef.current);

		if (!isOpen) {
			timeoutRef.current = setTimeout(() => setShow(false), +duration);
		} else {
			setShow(true);
		}
	}, [isOpen]);

	return (
		<>
			{show && (
				<Portal>
					<div
						style={{
							backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})`,
						}}
						className={clsx(
							'fixed top-0 left-0 bottom-0 right-0 bg-black',
							isOpen
								? 'visible bg-opacity-50'
								: 'invisible opacity-0',
							className ? className : 'z-10',
							duration && durationMap[duration]
						)}
						{...props}
					>
						{children}
					</div>
				</Portal>
			)}
		</>
	);
};

export default Overlay;
