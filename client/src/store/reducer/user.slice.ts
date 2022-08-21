import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthResponse } from 'types/auth/Auth.response';

export interface UserState {
	currentUser: IAuthResponse | null;
	isAuth: boolean;
}

const initialState: UserState = {
	currentUser: null,
	isAuth: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IAuthResponse>) => {
			state.currentUser = action.payload;
			state.isAuth = true;
		},
		removeUser: (state) => {
			state.currentUser = null;
			state.isAuth = false;
		},
	},
});

export const {
	actions: { setUser, removeUser },
	reducer: userReducer,
} = userSlice;
