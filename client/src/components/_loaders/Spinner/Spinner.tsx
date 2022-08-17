import clsx from 'clsx';
import styles from './styles.module.css';

interface SpinnerProps {
	size?: 'sm';
	className?: string;
}

const sizeMap = {
	sm: { size: 16, tw: 'h-8 w-8' },
};

const Spinner = ({ className, size = 'sm' }: SpinnerProps) => {
	const sz = sizeMap[size];

	return (
		<svg
			role="status"
			className={clsx(styles.svg, className)}
			// x={0}
			// y={0}
			width={sz.size}
			height={sz.size}
			viewBox={`0 0 ${sz.size} ${sz.size}`}
		>
			<circle
				cx={sz.size / 2}
				cy={sz.size / 2}
				r={sz.size / 2 - 2}
				className={clsx('fill-transparent stroke-white', styles.circle)}
			></circle>
		</svg>
	);
};

export default Spinner;
