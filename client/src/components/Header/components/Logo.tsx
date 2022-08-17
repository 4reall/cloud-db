import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { PathsEnum } from 'utils/constants/paths';

import { ReactComponent as MainLogo } from 'assets/icons/MainLogo.svg';

const Logo = () => {
	return (
		<div className="text-xl font-semibold text-gray-700">
			<Link
				className={clsx(
					'flex transform items-center text-2xl font-bold text-gray-800',
					'transition-colors duration-200 md:hover:text-blue-700',
					'dark:text-gray-200 dark:hover:text-white lg:text-3xl'
				)}
				to={PathsEnum.Home}
			>
				<MainLogo className="mr-3 h-12 w-12" />
				<span>Cloud database</span>
			</Link>
		</div>
	);
};

export default Logo;
