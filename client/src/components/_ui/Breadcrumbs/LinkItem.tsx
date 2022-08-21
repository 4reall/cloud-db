import { ChevronRightIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

interface LinkItemProps {
	name: string;
	path: string;
	active?: boolean;
}

const LinkItem = ({ name, path, active }: LinkItemProps) => {
	return (
		<li className="flex items-center" key={name + path}>
			<ChevronRightIcon className="mx-4 h-6 w-6" />
			<Link
				className={clsx(
					'relative md:hover:text-blue-700 md:hover:dark:text-white',
					active &&
						clsx(
							'before:absolute before:-bottom-[2px] before:w-full',
							'before:border-b-2 before:border-blue-700',
							'before:hover:border-blue-600'
						)
				)}
				to={path}
			>
				{name}
			</Link>
		</li>
	);
};

export default LinkItem;
