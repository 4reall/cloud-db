import Overlay, { OverlayProps } from 'components/_layout/Overlay';
import { HTMLProps, PropsWithChildren, MouseEvent } from 'react';
import { useAppSelector } from 'hooks/redux';
import { useDispatch } from 'react-redux';
import { toggleModal } from 'store/reducer/modal.slice';
import RoundButton from 'components/_ui/RoundButton';
import { LockClosedIcon, XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

interface IBaseModal {
	className?: string;
}

export type BaseModalProps = PropsWithChildren<IBaseModal>;

const BaseModal = ({ children, className }: BaseModalProps) => {
	const isOpen = useAppSelector((state) => state.modal.isOpen);
	const dispatch = useDispatch();

	const closeModal = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			dispatch(toggleModal());
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
					'w-60 w-[50%] min-w-[15rem] rounded-md p-8 shadow-md',
					'relative bg-white dark:bg-gray-600 dark:text-gray-200'
				)}
			>
				<span className="absolute top-2 right-2">
					<RoundButton
						className={clsx(
							'md:hover:dark:bg-gray-200 md:hover:dark:bg-opacity-10',
							'md:hover:bg-black md:hover:bg-opacity-10'
						)}
						onClick={() => dispatch(toggleModal())}
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
