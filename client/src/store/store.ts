import { configureStore } from '@reduxjs/toolkit';
import { middleware, reducer, reducerPath } from 'api/cloud.api';
import { localStorageMiddleware } from 'store/middlewares/localStorage.middleware';
import { userReducer } from 'store/reducer/user.slice';
import { fileReducer } from 'store/reducer/file.slice';
import { modalReducer } from 'store/reducer/modal.slice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		file: fileReducer,
		modal: modalReducer,
		[reducerPath]: reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([localStorageMiddleware, middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
