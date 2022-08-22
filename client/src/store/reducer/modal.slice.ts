import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
	isContext: boolean;
	isModal: boolean;
}

const initialState: ModalState = {
	isContext: false,
	isModal: false,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		toggleModal: (state) => {
			state.isModal = !state.isModal;
		},
		toggleContext: (state) => {
			state.isContext = !state.isContext;
		},
	},
});

export const {
	actions: { toggleModal, toggleContext },
	reducer: modalReducer,
} = modalSlice;
