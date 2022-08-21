import { useMemo, useRef, useState } from 'react';
import Menu from 'components/Header/components/Menu';
import { ILink } from 'types/Link';
import Burger from 'components/_ui/Burger';
import RoundButton from 'components/_ui/RoundButton';
import Container from 'components/Container';
import Logo from 'components/Header/components/Logo';
import NavLinks from 'components/Header/components/NavLinks';
import DarkModeSwitcher from 'components/DarkModeSwitcher';
import ProfileDropdown from 'components/Header/components/ProfileDropdown';
import Overlay from 'components/_layout/Overlay';
import { useAppSelector } from 'hooks/redux';
import { useClickOutside } from 'hooks/useClickOutside';
import useMediaQuery from 'hooks/useMediaQuery';
import { queries } from 'utils/constants/queries';

interface HeaderProps {
	links: ILink[];
}

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const isAuth = useAppSelector((state) => state.user.isAuth);
	const containerRef = useRef(null);
	const isMd = useMediaQuery(queries.up.md);

	useClickOutside(containerRef, () => setIsOpen(false));

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

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
			className="fixed z-20 w-full bg-white shadow dark:bg-gray-800"
		>
			<Container className="px-6 py-4">
				<div className="md:flex md:items-center md:justify-between">
					<div className="flex items-center justify-between">
						<Logo />
						<RoundButton
							className="md:hidden"
							onClick={handleToggle}
							size="sm"
							ripple
						>
							<Burger isActive={isOpen} />
						</RoundButton>
					</div>
					{isMd ? (
						<div className="flex flex-1 items-center justify-between">
							<NavLinks links={isAuth ? links : []} />
							<div className="mt-4 flex items-center first:mr-2 md:mt-0">
								<DarkModeSwitcher className="mr-2" />
								<ProfileDropdown isAuth={isAuth} />
							</div>
						</div>
					) : (
						<Menu isOpen={isOpen}>
							<NavLinks
								onClick={handleToggle}
								links={isAuth ? links : []}
							/>
							<div className="mt-4 flex items-center first:mr-2 md:mt-0">
								<DarkModeSwitcher className="mr-2" />
								<ProfileDropdown left isAuth={isAuth} />
							</div>
						</Menu>
					)}
				</div>
			</Container>
		</header>
	);
};

export default Header;
