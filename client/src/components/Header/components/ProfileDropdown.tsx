import { PropsWithChildren, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	LoginIcon,
	LogoutIcon,
	UserCircleIcon,
} from '@heroicons/react/outline';

import IconButton from 'components/_ui/_buttons/IconButton';
import Dropdown from 'components/_ui/Dropdown/Dropdown';

import { useAppDispatch } from 'hooks/redux';
import { removeUser } from 'store/reducer/user.slice';
import { PathsEnum } from 'utils/constants/paths';
import { useClickOutside } from 'hooks/useClickOutside';
import { log } from 'util';

interface DropdownMenuProps {
	isAuth: boolean;
	left?: boolean;
	isOpen: boolean;
	handleToggle: () => void;
}

const ProfileDropdown = ({
	isAuth,
	left,
	isOpen,
	handleToggle,
	children,
}: PropsWithChildren<DropdownMenuProps>) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const containerRef = useRef(null);

	useClickOutside(containerRef, () => isOpen && handleToggle());

	const login = () => {
		handleToggle();
		navigate(PathsEnum.Auth, { replace: true });
	};
	const logout = () => {
		handleToggle();
		dispatch(removeUser());
	};

	return (
		<Dropdown
			ref={containerRef}
			align={left ? 'left' : 'right'}
			trigger={
				<IconButton
					className="rounded-md text-black dark:text-gray-200"
					onClick={handleToggle}
					label="account"
					icon={<UserCircleIcon />}
					full
					ripple
				/>
			}
			isOpen={isOpen}
			color="bg-gray-100 dark:bg-gray-700"
		>
			{isAuth ? (
				<IconButton
					className={'py-3 px-5'}
					icon={<LogoutIcon />}
					label="Sign out"
					onClick={logout}
					full
				/>
			) : (
				<IconButton
					className={'py-3 px-5'}
					icon={<LoginIcon />}
					label="Sign in"
					onClick={login}
					full
				/>
			)}
		</Dropdown>
	);
};

export default ProfileDropdown;
