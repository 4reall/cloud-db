import Dropdown from 'components/_ui/Dropdown/Dropdown';
import { PropsWithChildren, useRef, useState } from 'react';
import RoundButton from 'components/_ui/_buttons/RoundButton';
import { DotsHorizontalIcon, DotsVerticalIcon } from '@heroicons/react/outline';
import { useClickOutside } from 'hooks/useClickOutside';
import useMediaQuery from 'hooks/useMediaQuery';
import { queries } from 'utils/constants/queries';

const AddingDropdown = ({ children }: PropsWithChildren<{}>) => {
	const isMd = useMediaQuery(queries.up.md);
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef(null);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	useClickOutside(containerRef, () => isOpen && setIsOpen(false));

	return (
		<Dropdown
			isOpen={isOpen}
			align="right"
			color="bg-gray-100 dark:bg-gray-500"
			trigger={
				<RoundButton
					ref={containerRef}
					onClick={handleClick}
					size={isMd ? 'md' : 'sm'}
					ripple
				>
					<DotsVerticalIcon />
				</RoundButton>
			}
		>
			{children}
		</Dropdown>
	);
};

export default AddingDropdown;
