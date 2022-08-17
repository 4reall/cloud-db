import { useMemo, useState } from 'react';
import Menu from 'components/Header/components/Menu';
import { ILink } from 'types/ILink';
import Burger from 'components/_ui/Burger';
import RoundButton from 'components/_ui/RoundButton';
import Container from 'components/Container';
import Logo from 'components/Header/components/Logo';
import NavLinks from 'components/Header/components/NavLinks';
import DarkModeSwitcher from 'components/DarkModeSwitcher';
import ProfileDropdown from 'components/Header/components/ProfileDropdown/ProfileDropdown';
import { useAppSelector } from 'hooks/useAppSelector';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const isAuth = useAppSelector((state) => state.user.isAuth);

	const links: ILink[] = useMemo(
		() => [
			{ href: '/disk', label: 'disk' },
			{ href: '/profile', label: 'profile' },
			// { href: '/1123jg', label: 'item 3' },
		],
		[]
	);

	return (
		<header className="fixed z-20 w-full bg-white shadow dark:bg-gray-800">
			<Container className="px-6 py-4">
				<div className="md:flex md:items-center md:justify-between">
					<div className="flex items-center justify-between">
						<Logo />
						<RoundButton
							className="md:hidden"
							onClick={() => setIsOpen(!isOpen)}
							size="sm"
							ripple
						>
							<Burger isActive={isOpen} />
						</RoundButton>
					</div>
					<Menu isOpen={isOpen}>
						<NavLinks links={isAuth ? links : []} />
						<div className="mt-4 flex items-center first:mr-2 md:mt-0">
							<DarkModeSwitcher className="mr-2" />
							<ProfileDropdown isAuth={isAuth} />
						</div>
					</Menu>
				</div>
			</Container>
		</header>
	);
};

export default Header;
