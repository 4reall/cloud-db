import clsx from 'clsx';

interface BurgerProps {
	onClick?: () => void;
	isActive?: boolean;
}

const Burger = ({ isActive }: BurgerProps) => {
	return (
		<div
			className={clsx(
				'flex h-full flex-1 flex-col items-center justify-around',
				'relative'
				// isActive && 'justify-center'
			)}
		>
			<span
				className={clsx(
					'absolute block h-[3px] w-full rounded-md transition-all duration-200',
					'bg-gray-500 hover:bg-gray-600 dark:bg-gray-200 dark:hover:bg-gray-400',
					isActive ? ' top-[50%] -rotate-45' : 'top-[10%]'
				)}
			/>
			<span
				className={clsx(
					'block h-[3px] w-full transition-all duration-150',
					'bg-gray-500 hover:bg-gray-600 dark:bg-gray-200 dark:hover:bg-gray-400',
					isActive && 'opacity-0'
				)}
			/>
			<span
				className={clsx(
					'absolute block h-[3px] w-full rounded-md transition-all duration-200',
					'bg-gray-500 hover:bg-gray-600 dark:bg-gray-200 dark:hover:bg-gray-400',
					isActive ? ' top-[50%] rotate-45' : 'bottom-[10%]'
				)}
			/>
		</div>
	);
};

export default Burger;
