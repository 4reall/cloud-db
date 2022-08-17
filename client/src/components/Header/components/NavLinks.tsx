import { ILink } from 'types/ILink';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

interface LinksProps {
	links: ILink[];
}

const NavLinks = ({ links }: LinksProps) => {
	return (
		<ul className="-mx-4 flex w-full flex-col md:mx-8 md:flex-row md:items-center">
			{links.map(({ href, label }) => (
				<li
					className={clsx(
						'text-md mx-2 mt-2 transform rounded-md px-2 py-1 md:mt-0',
						'font-medium uppercase text-black transition-colors duration-200',
						'dark:text-gray-200 md:hover:text-blue-700 md:dark:hover:text-white'
					)}
				>
					<NavLink
						className={({ isActive }) =>
							isActive
								? clsx(
										'relative after:h-[2px] after:w-[110%] after:md:block',
										' after:absolute after:-left-[3px] after:-bottom-1',
										'after:rounded-md after:bg-blue-700 md:hover:after:bg-blue-500'
								  )
								: ''
						}
						to={href}
					>
						{label}
					</NavLink>
				</li>
			))}
		</ul>
	);
};

export default NavLinks;
