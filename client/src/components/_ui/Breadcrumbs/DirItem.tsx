import { ChevronRightIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { IDir } from 'types/file/File';

interface DirItemProps extends IDir {
	active?: boolean;
	onClick: () => void;
}

const DirItem = ({ _id, name, active, onClick }: DirItemProps) => {
	return (
		<li className="flex items-center" key={_id}>
			<ChevronRightIcon className="mx-4 h-6 w-6" />
			<span
				className={clsx(
					'relative md:hover:text-blue-700 md:hover:dark:text-white',
					active &&
						clsx(
							'before:absolute before:-bottom-[2px] before:w-full',
							'before:border-b-2 before:border-blue-700',
							'before:hover:border-blue-600'
						)
				)}
				onClick={onClick}
			>
				{name}
			</span>
		</li>
	);
};

export default DirItem;
