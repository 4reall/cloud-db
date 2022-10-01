import Overlay from 'components/_layout/Overlay';
import { PropsWithChildren, MouseEvent } from 'react';
import { useAppSelector } from 'hooks/redux';
import { useDispatch } from 'react-redux';
import { toggleAddFolderModal } from 'store/reducer/modal.slice';
import RoundButton from 'components/_ui/_buttons/RoundButton';
import { XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { RootState } from 'store/store';

interface IBaseModal {
	modal: keyof RootState['modal'];
	toggleModal: () => void;
}

export type BaseModalProps = PropsWithChildren<IBaseModal>;

const BaseModal = ({ children, modal, toggleModal }: BaseModalProps) => {
	const isOpen = useAppSelector((state) => state.modal[modal]);
	const dispatch = useDispatch();

	const closeModal = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			toggleModal();
		}
	};

	return (
		<Overlay
			isOpen={isOpen}
			className="z-40 flex items-center justify-center"
			onClick={closeModal}
			duration="200"
		>
			<div
				className={clsx(
					'w-[80%] rounded-md p-8 shadow-md md:w-[50%]',
					'relative bg-white dark:bg-gray-600 dark:text-gray-200'
				)}
			>
				<span className="absolute top-2 right-2">
					<RoundButton
						className={clsx(
							'md:hover:dark:bg-gray-200 md:hover:dark:bg-opacity-10',
							'md:hover:bg-black md:hover:bg-opacity-10'
						)}
						onClick={toggleModal}
						size="sm"
					>
						<XIcon />
					</RoundButton>
				</span>
				{children}
			</div>
		</Overlay>
	);
};

export default BaseModal;
