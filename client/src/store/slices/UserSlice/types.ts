import { IUserData, IFriend } from "types/common";

export type StatusType = "ready" | "pending" | "auth" | "data";

export interface IState {
   isAuth: boolean,
   status: StatusType,
   data: IUserData,
   friends: IFriend[],
   photos: string[],
}
