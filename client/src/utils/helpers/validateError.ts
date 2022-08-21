import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const isFetchBaseQueryError = (
	error: unknown
): error is FetchBaseQueryError => {
	return typeof error === 'object' && error != null && 'status' in error;
};

export const isErrorWithMessage = (
	error: unknown
): error is { data: { message: string } } => {
	return (
		isFetchBaseQueryError(error) &&
		(error as any).data != null &&
		typeof (error as any).data === 'object' &&
		'message' in (error as any).data &&
		typeof (error as any).data.message === 'string'
	);
};
