import { useEffect, useLayoutEffect } from 'react';

import { useLazyAuthUserQuery } from 'api/endpoints/auth.endpoints';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { removeUser } from 'store/reducer/user.slice';
import { validateFetchError } from 'utils/helpers/validateError';

export const useAuth = () => {
	const [authUser, result] = useLazyAuthUserQuery();
	const dispatch = useAppDispatch();

	useLayoutEffect(() => {
		if (!localStorage.getItem('token')) return;
		authUser(null);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const status = validateFetchError(result.error)?.status;
		if (status === 401) {
			console.log(result.error);
			dispatch(removeUser());
		} else if (result.data) {
			// dispatch(setUser(result.data));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [result]);

	return result;
};
