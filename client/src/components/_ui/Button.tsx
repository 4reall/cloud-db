import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

import Ripple from 'components/Ripple/Ripple';
import Spinner from 'components/_ui/Spinner';

interface ButtonProps {
	big?: boolean;
	ripple?: boolean;
	onClick?: () => void;
	className?: string;
	loading?: boolean;
}

const Button = ({
	children,
	big,
	ripple,
	onClick,
	className,
	loading,
}: PropsWithChildren<ButtonProps> & ButtonHTMLAttributes<any>) => {
	return (
		<button
			onClick={onClick}
			className={clsx(
				'relative rounded-md bg-blue-700 py-2 px-3',
				big && 'text-xl',
				className,
				loading && 'pl-8'
			)}
		>
			<span
				className={clsx(
					'relative uppercase text-white',
					big && 'text-xl'
				)}
			>
				{loading ? 'Processing...' : children}
				{loading && (
					<Spinner
						className="absolute left-[-23px] top-[2px]"
						size="sm"
						// color="black"
					/>
				)}
			</span>
			{ripple && <Ripple />}
		</button>
	);
};

export default Button;
