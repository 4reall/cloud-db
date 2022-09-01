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
				url: BASE_URL,
				method: 'POST',
				body: {
					name,
					parentId: parentId ? parentId : undefined,
					type: 'dir',
				},
				params: {
					parentId: parentId ? parentId : undefined,
				},
			}),
			invalidatesTags: ['File'],
		}),
		getFiles: build.query<IFile[], string | undefined>({
			query: (parentId) => ({
				url: BASE_URL,
				params: {
					parentId: parentId ? parentId : undefined,
				},
			}),
			providesTags: ['File'],
			transformResponse: (state: IFileResponse[]) => {
				return state.map(
					({ childrenIds, parentId, ...props }) => props
				);
			},
		}),
		uploadFile: build.mutation<IFile, FormData>({
			query: (body) => ({
				url: `${BASE_URL}/upload`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['File'],
		}),
		deleteFile: build.mutation<IFile, IFileQuery>({
			query: ({ _id }) => ({
				url: BASE_URL,
				method: 'DELETE',
				params: {
					_id,
				},
			}),
			invalidatesTags: ['File'],
		}),
		downloadFile: build.query<null, Required<Omit<IFileQuery, 'parentId'>>>(
			{
				queryFn: async (
					{ _id, name },
					api,
					extraOptions,
					baseQuery
				) => {
					const result = await baseQuery({
						url: `${BASE_URL}/download`,
						params: {
							_id,
						},
						responseHandler: (response) => response.blob(),
					});
					const hiddenElement = document.createElement('a');
					const url = window.URL || window.webkitURL;
					hiddenElement.href = url.createObjectURL(
						result.data as Blob
					);
					hiddenElement.target = '_blank';
					hiddenElement.download = name;
					hiddenElement.click();
					return { data: null };
				},
			}
		),
	}),
});

export const {
	useCreateDirMutation,
	useGetFilesQuery,
	useUploadFileMutation,
	useDeleteFileMutation,
	useLazyDownloadFileQuery,
} = fileEndpoints;
