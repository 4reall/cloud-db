import SpinnerUI from 'react-spinner-material';
import clsx from 'clsx';

type SpinnerProps = {
	size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
	// color?: string;
	className?: string;
};

const sizesMap = {
	sm: [8, 2],
	md: [16, 4],
	lg: [32, 6],
	xl: [48, 8],
	'2xl': [80, 12],
	'3xl': [112, 14],
};

const Spinner = ({ size = 'md', ...props }: SpinnerProps) => {
	const [radius, border] = sizesMap[size];
	return <SpinnerUI radius={radius} stroke={border} {...props} />;
};

export default Spinner;
