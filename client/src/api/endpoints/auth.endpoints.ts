import { injectEndpoints } from 'api/cloud.api';
import { IAuthUser, IUser } from 'types/IUser';
import { IBaseQuery } from 'types/IBaseQuery';
import { removeUser, setUser } from 'store/reducer/user.slice';

const BASE_URL = '/auth';

const authEndpoints = injectEndpoints({
	endpoints: (build) => ({
		registerUser: build.mutation<IUser, IBaseQuery>({
			query: (user) => ({
				url: `${BASE_URL}/registration`,
				method: 'POST',
				body: user,
			}),
		}),
		loginUser: build.mutation<IAuthUser, IBaseQuery>({
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
				} catch (e) {}
			},
		}),
		authUser: build.query<IAuthUser, null>({
			query: () => `${BASE_URL}/auth`,
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
