import { injectEndpoints } from 'api/cloud.api';
import { IUser } from 'types/user/User';
import { IAuthQuery } from 'types/auth/Auth.query';
import { removeUser, setUser } from 'store/reducer/user.slice';
import { IAuthResponse } from 'types/auth/Auth.response';

const BASE_URL = '/auth';

const authEndpoints = injectEndpoints({
	endpoints: (build) => ({
		registerUser: build.mutation<IUser, IAuthQuery>({
			query: (user) => ({
				url: `${BASE_URL}/registration`,
				method: 'POST',
				body: user,
			}),
		}),
		loginUser: build.mutation<IAuthResponse, IAuthQuery>({
			query: (user) => ({
				url: `${BASE_URL}/login`,
				method: 'POST',
				body: user,
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUser(data));
					localStorage.setItem('token', data.token);
				} catch (e) {
					if (localStorage.getItem('token')) {
						localStorage.removeItem('token');
					}
					dispatch(removeUser());
				}
			},
		}),
		authUser: build.query<IAuthResponse, null>({
			query: () => `${BASE_URL}/auth`,
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUser(data));
					localStorage.setItem('token', data.token);
				} catch (e) {
					console.log(e);
				}
			},
		}),
	}),
});

export const {
	useRegisterUserMutation,
	useLoginUserMutation,
	useAuthUserQuery,
	useLazyAuthUserQuery,
} = authEndpoints;
