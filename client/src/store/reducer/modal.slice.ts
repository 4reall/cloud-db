import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
	isOpen: boolean;
}

const initialState: ModalState = {
	isOpen: false,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		toggleModal: (state) => {
			state.isOpen = !state.isOpen;
		},
	},
});

export const {
	actions: { toggleModal },
	reducer: modalReducer,
} = modalSlice;
