import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const validateFetchError = (
	error: SerializedError | FetchBaseQueryError | undefined
): FetchBaseQueryError | null => {
	if (!error) return null;

	if ('status' in error) return error as FetchBaseQueryError;

	return null;
};
