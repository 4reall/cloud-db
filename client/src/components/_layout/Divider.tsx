import clsx from 'clsx';
import { HTMLAttributes } from 'react';

const alignMap = {
	horizontal:
		'block h-0 w-full rounded-[1px] border-t-[1px] border-black dark:border-gray-200',
	vertical:
		'block w-0 h-full rounded-[1px] border-r-[1px] border-black dark:border-gray-200',
};

type DividerProps = {
	align?: 'vertical' | 'horizontal';
	color?: string;
	width?: string;
	height?: string;
} & HTMLAttributes<HTMLSpanElement>;

const Divider = ({
	align = 'vertical',
	className,
	color,
	width,
	height,
	...props
}: DividerProps) => {
	return (
		<div
			style={{ borderColor: color, width, height }}
			className={clsx(alignMap[align], className)}
			{...props}
		/>
	);
};

export default Divider;
