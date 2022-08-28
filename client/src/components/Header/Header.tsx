import { useMemo, useRef, useState } from 'react';
import Menu from 'components/Header/components/Menu';
import { ILink } from 'types/Link';
import Burger from 'components/_ui/_buttons/Burger';
import RoundButton from 'components/_ui/_buttons/RoundButton';
import Container from 'components/Container';
import Logo from 'components/Header/components/Logo';
import NavLinks from 'components/Header/components/NavLinks';
import DarkModeSwitcher from 'components/DarkModeSwitcher';
import ProfileDropdown from 'components/Header/components/ProfileDropdown';
import Overlay from 'components/_layout/Overlay';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useClickOutside } from 'hooks/useClickOutside';
import useMediaQuery from 'hooks/useMediaQuery';
import { queries } from 'utils/constants/queries';
import IconButton from 'components/_ui/_buttons/IconButton';
import { LoginIcon, LogoutIcon } from '@heroicons/react/outline';
import { PathsEnum } from 'utils/constants/paths';
import { removeUser } from 'store/reducer/user.slice';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
	links: ILink[];
}

const Header = () => {
	const [isMenu, setIsMenu] = useState(false);
	const [isDropdown, setIsDropdown] = useState(false);
	const isAuth = useAppSelector((state) => state.user.isAuth);
	const containerRef = useRef(null);
	const isMd = useMediaQuery(queries.up.md);

	const handleMenuToggle = () => setIsMenu(!isMenu);
	const handleDropdownToggle = () => setIsDropdown(!isDropdown);

	useClickOutside(containerRef, () => {
		setIsDropdown(false);
		setIsMenu(false);
	});

	const links: ILink[] = useMemo(
		() => [
			{ href: '/disk', label: 'disk' },
			{ href: '/profile', label: 'profile' },
			// { href: '/1123jg', label: 'item 3' },
		],
		[]
	);

	return (
		<header
			ref={containerRef}
			className="fixed z-20 w-full bg-white dark:bg-gray-800"
		>
			<Container className="px-6 py-4">
				<div className="md:flex md:items-center md:justify-between">
					<div className="flex items-center justify-between">
						<Logo />
						<RoundButton
							className="md:hidden"
							onClick={handleMenuToggle}
							size="md"
							ripple
						>
							<Burger isActive={isMenu} />
						</RoundButton>
					</div>
					{isMd ? (
						<div className="flex flex-1 items-center justify-between">
							<NavLinks links={isAuth ? links : []} />
							<div className="mt-4 flex items-center first:mr-2 md:mt-0">
								<DarkModeSwitcher className="mr-2" />
								<ProfileDropdown
									isOpen={isDropdown}
									handleToggle={handleDropdownToggle}
									isAuth={isAuth}
								/>
							</div>
						</div>
					) : (
						<Menu isOpen={isMenu}>
							<NavLinks
								onClick={handleMenuToggle}
								links={isAuth ? links : []}
							/>
							<div className="mt-4 flex items-center first:mr-2 md:mt-0">
								<DarkModeSwitcher className="mr-2" />
								<ProfileDropdown
									handleToggle={handleDropdownToggle}
									isOpen={isDropdown}
									left
									isAuth={isAuth}
								/>
							</div>
						</Menu>
					)}
				</div>
			</Container>
		</header>
	);
};

export default Header;
