import {
	ButtonHTMLAttributes,
	ComponentPropsWithoutRef,
	forwardRef,
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

const RoundButton = forwardRef<HTMLButtonElement, ContentButtonProps>(
	({ children, size, className, ripple, ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={clsx(
					'relative overflow-hidden rounded-full duration-300',
					'base__color base__color_hover base__bg_hover',
					sizeMap[size],
					className
				)}
				{...props}
			>
				{children}
				{ripple && <Ripple />}
			</button>
		);
	}
);

export default RoundButton;
