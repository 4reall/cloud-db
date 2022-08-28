import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDir, IFile } from 'types/file/File';

export interface FileState {
	currentDir: IDir | null;
	dirStack: IDir[];
}

const initialState: FileState = {
	currentDir: null,
	dirStack: [],
};

const fileSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setCurrentDir: (state, action: PayloadAction<IDir | null>) => {
			state.currentDir = action.payload;
		},
		pushToStack: (state, action: PayloadAction<IDir>) => {
			state.dirStack.push(action.payload);
		},
		sliceStack: (state, action: PayloadAction<string>) => {
			const index = state.dirStack.findIndex(
				(dir) => dir._id === action.payload
			);
			state.dirStack = state.dirStack.splice(0, index + 1);
		},
		popFromStack: (state) => {
			state.dirStack.pop();
		},
		clearStack: (state) => {
			state.dirStack = [];
		},
	},
});

export const {
	actions: {
		setCurrentDir,
		clearStack,
		pushToStack,
		sliceStack,
		popFromStack,
	},
	reducer: fileReducer,
} = fileSlice;
