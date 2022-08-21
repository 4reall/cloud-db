import { injectEndpoints } from 'api/cloud.api';
import { IFileQuery } from 'types/file/File.query';
import { IFile } from 'types/file/File';
import { IFileResponse } from 'types/file/File.response';
import { setCurrentDir } from 'store/reducer/file.slice';

const BASE_URL = '/files';

const fileEndpoints = injectEndpoints({
	endpoints: (build) => ({
		createDir: build.mutation<IFile, IFileQuery>({
			query: ({ parentId, name }) => ({
				url: `${BASE_URL}${parentId ? `?parentId=${parentId}` : ''}`,
				method: 'POST',
				body: {
					name,
					parentId: parentId ? parentId : undefined,
					type: 'dir',
				},
			}),
			invalidatesTags: ['File'],
		}),
		getFiles: build.query<IFile[], {}>({
			query: () => `${BASE_URL}`,
			providesTags: ['File'],
			transformResponse: (state: IFileResponse[]) => {
				return state.map(
					({ childrenIds, parentId, ...props }) => props
				);
			},
		}),
		getFile: build.query<IFile, string>({
			query: (parentId) => `${BASE_URL}?parentId=${parentId}`,
			providesTags: ['File'],
			transformResponse: (state: IFileResponse) => {
				const { childrenIds, parentId, ...props } = state;
				return props;
			},
		}),
	}),
});

export const { useCreateDirMutation, useGetFileQuery, useLazyGetFilesQuery } =
	fileEndpoints;
