import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface ProgressProps {
	className?: string;
}

const Progress = ({ className }: ProgressProps) => {
	const [progress, setProgress] = useState(0);
	const speed = useRef(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				if (oldProgress === 100) {
					clearInterval(timer);
				}
				speed.current = oldProgress > 50 ? 30 : 70;
				const diff =
					Math.random() * ((101 - oldProgress) / speed.current);

				return Math.min(oldProgress + diff, 100);
			});
		}, 40);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div
			className={clsx(
				'bg fixed top-0 h-2 w-full rounded-full bg-gray-400',
				className
			)}
		>
			<div
				style={{ width: progress + '%' }}
				className="h-full w-3/4 rounded-full bg-white text-center text-xs text-white"
			></div>
		</div>
	);
};

export default Progress;
