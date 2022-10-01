import {
	ComponentPropsWithoutRef,
	useState,
	FocusEvent,
	forwardRef,
} from 'react';
import clsx from 'clsx';
import Ripple from 'components/Ripple/Ripple';

const sizeMap = {
	md: 'mt-3 text-xl',
	sm: 'mt-1',
};

const variantMap = {
	outline: clsx(
		'w-full appearance-none overflow-hidden outline-none',
		'rounded-lg border-transparent bg-gray-100 py-2 px-4',
		'text-gray-600 focus:outline-none focus:ring-blue-700'
	),
	underline: clsx(''),
};

interface InputOwnProps {
	isError: boolean;
	size: keyof typeof sizeMap;
	variant?: keyof typeof variantMap;
	full?: boolean;
}

type InputProps = InputOwnProps &
	Omit<ComponentPropsWithoutRef<'input'>, 'size'>;

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{ size, isError, className, variant, full, onFocus, onBlur, ...props },
		ref
	) => {
		const [isFocused, setIsFocused] = useState(false);

		const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
			const focused = e.target === document.activeElement;
			setIsFocused(focused);
			if (onFocus) onFocus(e);
		};

		const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
			setIsFocused(false);
			if (onBlur) onBlur(e);
		};

		return (
			<div className="relative">
				<input
					ref={ref}
					{...props}
					className={clsx(
						'appearance-none overflow-hidden outline-none',
						'bg-transparent py-2 px-4 text-gray-600 dark:text-gray-200',
						'border-b-2 border-gray-400',
						full && 'w-full',
						sizeMap[size],
						className
					)}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
				<span
					className={clsx(
						'absolute bottom-0 block border-b-2 transition-all',
						'origin-center border-blue-700 duration-200 dark:border-gray-300',
						isError ? 'invisible transition-none' : 'visible',
						isFocused && !isError ? 'left-0 w-full' : 'left-1/2 w-0'
					)}
				/>
				<span
					className={clsx(
						'absolute bottom-0 block border-b-2',
						'origin-center border-red-600 transition-all duration-300',
						isError
							? 'left-0 w-full'
							: 'left-1/2 w-0 transition-none'
					)}
				/>
			</div>
		);
	}
);

export default Input;
