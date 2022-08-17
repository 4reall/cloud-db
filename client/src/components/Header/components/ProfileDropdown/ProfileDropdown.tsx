import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginIcon, LogoutIcon } from '@heroicons/react/outline';

import IconButton from 'components/_ui/IconButton';
import Dropdown from 'components/_ui/Dropdown/Dropdown';
import ProfileButton from 'components/Header/components/ProfileDropdown/ProfileButton';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { removeUser } from 'store/reducer/user.slice';
import { PathsEnum } from 'utils/constants/paths';

interface DropdownMenuProps {
	isAuth: boolean;
}

const ProfileDropdown = ({ isAuth }: PropsWithChildren<DropdownMenuProps>) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const login = () => {
		navigate(PathsEnum.Auth, { replace: true });
	};
	const logout = () => {
		dispatch(removeUser());
	};

	return (
		<Dropdown renderButton={<ProfileButton />}>
			{isAuth ? (
				<IconButton
					icon={<LogoutIcon />}
					label="Sign out"
					onClick={logout}
				/>
			) : (
				<IconButton
					icon={<LoginIcon />}
					label="Sign in"
					onClick={login}
				/>
			)}
		</Dropdown>
	);
};

export default ProfileDropdown;
