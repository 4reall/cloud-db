import { Children, HTMLAttributes, PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PathsEnum } from 'utils/constants/paths';
import { HomeIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { IDir } from 'types/file/File';

const Breadcrumbs = ({ children }: PropsWithChildren<{}>) => {
	return (
		<ul className="flex select-none items-center overflow-hidden p-2 text-sm text-black dark:text-gray-200">
			<li>
				<Link
					className="md:hover:text-blue-700 md:hover:dark:text-white"
					to={PathsEnum.Home}
				>
					<HomeIcon className="h-5 w-5" />
				</Link>
			</li>
			{Children.map(children, (child, i) => (
				<>
					<ChevronRightIcon className="mx-2 h-6 w-6" />
					<li className="block flex cursor-pointer items-center">
						<span
							className={clsx(
								'relative md:hover:text-blue-700 md:hover:dark:text-white',
								Children.count(children) - 1 === i &&
									clsx(
										'before:absolute before:-bottom-[2px] before:w-full',
										'before:border-b-2 before:border-blue-700',
										'before:hover:border-blue-600'
									)
							)}
						>
							{child}
						</span>
					</li>
				</>
			))}
		</ul>
	);
};

export default Breadcrumbs;
