import { configureStore } from '@reduxjs/toolkit';
import { middleware, reducer, reducerPath } from 'api/cloud.api';
import { localStorageMiddleware } from 'store/middlewares/localStorage.middleware';
import { userReducer } from 'store/reducer/user.slice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		[reducerPath]: reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([localStorageMiddleware, middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
