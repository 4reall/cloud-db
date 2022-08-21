import { ILink } from 'types/Link';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';

interface INavLinks {
	links: ILink[];
}

type NavLinksProps = INavLinks & HTMLAttributes<HTMLUListElement>;

const NavLinks = ({ links, className, ...props }: NavLinksProps) => {
	return (
		<ul
			{...props}
			className={clsx(
				'-mx-4 flex w-full flex-col md:mx-8 md:flex-row md:items-center',
				className
			)}
		>
			{links.map(({ href, label }, i) => (
				<li
					key={href + i}
					className={clsx(
						'text-md mx-2 mt-2 transform rounded-md px-2 py-1 md:mt-0',
						'font-medium uppercase text-black transition-colors duration-200',
						'dark:text-gray-200 md:hover:text-blue-700 md:dark:hover:text-white'
					)}
				>
					<NavLink className="block" to={href}>
						{({ isActive }) => (
							<span
								className={
									isActive
										? clsx(
												'relative after:h-[2px] after:w-[110%] after:md:block',
												'after:absolute after:-left-[3px] after:-bottom-1',
												'after:rounded-md after:bg-blue-700 md:hover:after:bg-blue-500'
										  )
										: ''
								}
							>
								{label}
							</span>
						)}
					</NavLink>
				</li>
			))}
		</ul>
	);
};

export default NavLinks;
