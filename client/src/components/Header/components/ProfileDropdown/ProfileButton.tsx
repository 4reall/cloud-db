import { UserCircleIcon } from '@heroicons/react/outline';
import IconButton from 'components/_ui/IconButton';
import Ripple from 'components/Ripple/Ripple';

const ProfileButton = () => {
	return (
		<>
			<IconButton icon={<UserCircleIcon />} label="account" />
			<Ripple />
		</>
	);
};

export default ProfileButton;
