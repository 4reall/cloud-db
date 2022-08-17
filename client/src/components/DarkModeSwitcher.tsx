import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import Toggle from 'components/_ui/Toggle';
import clsx from 'clsx';

interface DarkModeSwitcherProps {
	className?: string;
}

const DarkModeSwitcher = ({ className }: DarkModeSwitcherProps) => {
	const isChecked =
		localStorage.getItem('theme') === 'dark' ||
		(window.matchMedia('(prefers-color-scheme: dark)').matches &&
			!localStorage.getItem('theme'));

	const [checked, setChecked] = useState(isChecked);

	const handleToggle = () => {
		setChecked(!checked);
	};

	useEffect(() => {
		const mode = checked ? 'dark' : 'light';

		localStorage.setItem('theme', mode);

		document.documentElement.className = mode;
	}, [checked]);

	return (
		<div className={clsx('flex flex-row-reverse', className)}>
			<Toggle
				checked={checked}
				onChange={handleToggle}
				className="ml-2"
			/>
			{checked ? (
				<MoonIcon className="h-6 w-6 text-gray-200" />
			) : (
				<SunIcon className="h-6 w-6 text-black" />
			)}
		</div>
	);
};

export default DarkModeSwitcher;
