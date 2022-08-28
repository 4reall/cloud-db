import {
	ButtonHTMLAttributes,
	ComponentPropsWithoutRef,
	PropsWithChildren,
	useEffect,
	useRef,
	useState,
} from 'react';
import clsx from 'clsx';

import Ripple from 'components/Ripple/Ripple';
import Spinner from 'components/_ui/_loaders/Spinner';
import { useDebounce } from 'hooks/useTimeout';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
	big?: boolean;
	ripple?: boolean;
	onClick?: () => void;
	className?: string;
	loading?: boolean;
	disabled?: boolean;
}

const Button = ({
	children,
	big,
	ripple,
	className,
	loading,
	...props
}: PropsWithChildren<ButtonProps> & ButtonHTMLAttributes<any>) => {
	const [delayedLoading, setDelayedLoading] = useState(loading);

	useEffect(() => {
		const id = setTimeout(() => setDelayedLoading(loading), 100);
		return () => clearTimeout(id);
	}, [loading]);

	return (
		<button
			className={clsx(
				'relative rounded-md bg-blue-700 py-2 px-3',
				'disabled:cursor-not-allowed',
				big && 'text-xl',
				className,
				delayedLoading && 'pl-9'
			)}
			{...props}
		>
			<span
				className={clsx(
					'relative uppercase text-white',
					big && 'text-xl'
				)}
			>
				{delayedLoading ? 'Processing...' : children}
				{delayedLoading && (
					<Spinner
						className="absolute left-[-25px] top-[4px] border-black dark:border-gray-200"
						size="md"
					/>
				)}
			</span>
			{ripple && <Ripple />}
		</button>
	);
};

export default Button;
