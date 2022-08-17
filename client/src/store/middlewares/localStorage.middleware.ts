import { Middleware } from 'redux';
import { removeUser, setUser } from 'store/reducer/user.slice';

export const localStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		if (setUser.match(action)) {
			localStorage.setItem('token', action.payload.token);
		} else if (removeUser.match(action)) {
			localStorage.removeItem('token');
		}
		return next(action);
	};
