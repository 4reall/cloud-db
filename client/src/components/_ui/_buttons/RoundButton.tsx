import {
	ButtonHTMLAttributes,
	ComponentPropsWithoutRef,
	HTMLAttributes,
	HTMLProps,
	PropsWithChildren,
} from 'react';
import clsx from 'clsx';
import Ripple from 'components/Ripple/Ripple';

interface ContentButtonProps extends ComponentPropsWithoutRef<'button'> {
	size: 'sm' | 'md' | 'lg';
	ripple?: boolean;
}

const sizeMap = {
	sm: 'h-8 w-8 p-1',
	md: 'h-12 w-12 p-[10px]',
	lg: 'h-16 w-16 p-3',
};

const RoundButton = ({
	children,
	onClick,
	size,
	className,
	ripple,
}: ContentButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={clsx(
				'relative overflow-hidden rounded-full duration-300',
				'base__color base__color_hover base__bg_hover',
				sizeMap[size],
				className
			)}
		>
			{children}
			{ripple && <Ripple />}
		</button>
	);
};

export default RoundButton;
