import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDir, IFile } from 'types/file/File';

export interface FileState {
	currentDir: IDir | null;
	files: IFile[];
	dirStack: IDir[];
}

const initialState: FileState = {
	currentDir: null,
	dirStack: [],
	files: [],
};

const fileSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setCurrentDir: (state, action: PayloadAction<IDir>) => {
			state.currentDir = action.payload;
		},
		setFiles: (state, action: PayloadAction<IFile[]>) => {
			state.files = action.payload;
		},
		pushToStack: (state, action: PayloadAction<IDir>) => {
			state.dirStack.push(action.payload);
		},
		popFromStack: (state, action: PayloadAction<string>) => {
			const index = state.dirStack.findIndex(
				(dir) => dir._id === action.payload
			);
			state.dirStack = state.dirStack.splice(0, index + 1);
		},
	},
});

export const {
	actions: { setCurrentDir, setFiles, pushToStack, popFromStack },
	reducer: fileReducer,
} = fileSlice;
