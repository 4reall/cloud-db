import { PropsWithChildren } from 'react';
import clsx from 'clsx';

interface ContainerProps {
	className?: string;
}

const Container = ({
	children,
	className,
}: PropsWithChildren<ContainerProps>) => {
	return (
		<div className={clsx('mx-auto max-w-5xl', className)}>{children}</div>
	);
};

export default Container;
