import { IUser } from "./IUser";

export type IUserRequest = Pick<IUser, "email" | "password">;
