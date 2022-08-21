import {
	BaseQueryFn,
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'utils/constants/env';

const cloudApi = createApi({
	reducerPath: 'cloudApi',
	tagTypes: ['File'],
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem('token');

			if (!token) return headers;

			headers.set('authorization', `Bearer ${token}`);

			return headers;
		},
	}),
	endpoints: () => ({}),
});

export const { reducer, reducerPath, middleware, injectEndpoints } = cloudApi;
