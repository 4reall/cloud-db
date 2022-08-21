import { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import Ripple from 'components/Ripple/Ripple';

interface IIconButton {
	icon: ReactNode;
	label: string;
	ripple?: boolean;
	full?: boolean;
}

type IconButtonProps = IIconButton & HTMLAttributes<HTMLButtonElement>;

const IconButton = ({
	icon,
	label,
	className,
	ripple,
	full,
	...props
}: IconButtonProps) => {
	return (
		<button
			{...props}
			className={clsx(
				'relative flex items-end overflow-hidden rounded-md p-2',
				'text-black dark:text-gray-200 md:hover:text-blue-700 md:hover:dark:text-white ',
				full && 'w-full',
				className
			)}
		>
			<div className="mr-2 inline-block h-6 w-6">{icon}</div>
			<span className="text-sm uppercase">{label}</span>
			{ripple && <Ripple />}
		</button>
	);
};

export default IconButton;
