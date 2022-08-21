import { IUser } from "./User";

export type IUserRequest = Pick<IUser, "email" | "password">;
