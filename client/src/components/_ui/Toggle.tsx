import clsx from 'clsx';
import { Switch } from '@headlessui/react';

interface ToggleProps {
	checked: boolean;
	onChange: () => void;
	className?: string;
}

const Toggle = (props: ToggleProps) => {
	return (
		<Switch.Group>
			<div
				className={clsx(
					'relative flex h-6 w-10 rounded-full bg-gray-500',
					props.className
				)}
			>
				<Switch.Label
					className={clsx(
						'inline-block h-full w-full cursor-pointer',
						'select-none overflow-hidden'
					)}
				/>
				<Switch
					{...props}
					className={clsx(
						'absolute right-4 block h-6 w-6 ',
						'cursor-pointer appearance-none',
						'rounded-full border-4 bg-white outline-none',
						'top-0 duration-200 ease-in',
						'border-gray-300 focus:outline-none',
						props.checked && '-right-0 bg-blue-500'
					)}
				/>
			</div>
		</Switch.Group>
	);
};

export default Toggle;
