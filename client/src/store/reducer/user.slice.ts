import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthUser } from 'types/IUser';

const initialState = {
	currentUser: {},
	isAuth: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IAuthUser>) => {
			state.currentUser = action.payload;
			state.isAuth = true;
		},
		removeUser: (state) => {
			state.currentUser = {};
			state.isAuth = false;
		},
	},
});

export const {
	actions: { setUser, removeUser },
	reducer: userReducer,
} = userSlice;
