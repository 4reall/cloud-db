import clsx from 'clsx';

const sizeMap = {
	md: 'min-h-6 text-base',
	sm: 'min-h-5 text-sm',
};

interface ValidationErrorProps {
	message?: string | number;
	className?: string;
	size?: keyof typeof sizeMap;
}

const ValidationError = ({
	message,
	size = 'md',
	className,
}: ValidationErrorProps) => {
	return (
		<div className={clsx('flex items-center', className)}>
			<span
				className={clsx(
					'inline-block pt-1 pb-1 text-red-600',
					sizeMap[size]
				)}
			>
				{message || '\u200b'}
			</span>
		</div>
	);
};

export default ValidationError;
