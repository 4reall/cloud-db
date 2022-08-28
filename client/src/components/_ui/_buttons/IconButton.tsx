import { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import Ripple from 'components/Ripple/Ripple';

interface IIconButton {
	icon: ReactNode;
	label: string;
	ripple?: boolean;
	full?: boolean;
}

type IconButtonProps = IIconButton & ComponentPropsWithoutRef<'button'>;

const IconButton = ({
	icon,
	label,
	className,
	ripple,
	full,
	disabled,
	...props
}: IconButtonProps) => {
	return (
		<button
			{...props}
			disabled={disabled}
			className={clsx(
				'relative flex items-end overflow-hidden rounded-md p-2 text-black',
				'dark:text-gray-200 md:hover:text-blue-700 md:hover:dark:text-white ',
				'disabled:text-gray-400 dark:disabled:text-gray-300',
				full && 'w-full',
				className
			)}
		>
			<div className="mr-2 inline-block h-6 w-6">{icon}</div>
			<span className="uppercase">{label}</span>
			{ripple && !disabled && <Ripple />}
		</button>
	);
};

export default IconButton;
