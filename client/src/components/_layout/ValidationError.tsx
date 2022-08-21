import clsx from 'clsx';

interface ValidationErrorProps {
	message?: string | number;
	className?: string;
	big?: boolean;
}

const ValidationError = ({ message, big, className }: ValidationErrorProps) => {
	return (
		<div className={clsx('flex items-center', className)}>
			<span
				className={clsx(
					'inline-block pt-2 pb-1 text-red-600',
					big ? 'min-h-8 text-lg' : 'min-h-6 text-sm'
				)}
			>
				{message || '\u200b'}
			</span>
		</div>
	);
};

export default ValidationError;
