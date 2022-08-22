import clsx from 'clsx';
import validationError from 'components/_layout/ValidationError';
import { HTMLAttributes } from 'react';

const alignMap = {
	horizontal:
		'block w-full h-0 rounded-[1px] border-t-2 border-black dark:border-gray-200',
	vertical:
		'block h-full w-0 rounded-[1px] border-r-2 border-black dark:border-gray-200',
};

type DividerProps = {
	align?: 'vertical' | 'horizontal';
	color?: string;
} & HTMLAttributes<HTMLSpanElement>;

const Divider = ({
	align = 'vertical',
	className,
	color,
	...props
}: DividerProps) => {
	return (
		<span
			style={{ borderColor: color }}
			className={clsx(alignMap[align], className)}
			{...props}
		/>
	);
};

export default Divider;
