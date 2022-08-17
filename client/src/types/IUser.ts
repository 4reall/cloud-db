export interface IUser {
	id: string;
	email: string;
	diskSpace: number;
	usedSpace: number;
	// avatar: string;
	// files: IFile[];
}

export interface IAuthUser {
	token: string;
	user: IUser;
}
