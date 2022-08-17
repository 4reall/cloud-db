import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import Ripple from 'components/Ripple/Ripple';

interface ContentButtonProps {
	onClick: () => void;
	size: 'sm' | 'md' | 'lg';
	ripple: boolean;
	className?: string;
}

const sizeMap = {
	sm: '',
};

const RoundButton = ({
	children,
	onClick,
	size,
	className,
	ripple,
}: PropsWithChildren<ContentButtonProps>) => {
	return (
		<button
			onClick={onClick}
			className={clsx(
				'relative h-12 w-12 overflow-hidden rounded-full p-3',
				className
			)}
		>
			{children}
			{ripple && <Ripple />}
		</button>
	);
};

export default RoundButton;
