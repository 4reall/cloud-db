import clsx from 'clsx';
import validationError from 'components/_layout/ValidationError';
import { HTMLAttributes } from 'react';

const alignMap = {
	horizontal: 'block w-full h-0 rounded-[1px] border-t-2 border-black',
	vertical: 'block h-full w-0 rounded-[1px] border-r-2 border-black',
};

type DividerProps = {
	align?: 'vertical' | 'horizontal';
} & HTMLAttributes<HTMLSpanElement>;

const Divider = ({ align = 'vertical', className, ...props }: DividerProps) => {
	return <span className={clsx(alignMap[align], className)} {...props} />;
};

export default Divider;
