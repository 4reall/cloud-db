import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
	isUploadFileModal: boolean;
	isAddFolderModal: boolean;
}

const initialState: ModalState = {
	isUploadFileModal: false,
	isAddFolderModal: false,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		toggleAddFolderModal: (state) => {
			state.isAddFolderModal = !state.isAddFolderModal;
		},
		toggleUploadFileModal: (state) => {
			state.isUploadFileModal = !state.isUploadFileModal;
		},
	},
});

export const {
	actions: { toggleAddFolderModal, toggleUploadFileModal },
	reducer: modalReducer,
} = modalSlice;
