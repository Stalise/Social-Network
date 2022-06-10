import { IUserData } from "types/common";

export type StatusType = "ready" | "pending" | "auth";

export interface IState {
   isAuth: boolean,
   status: StatusType,
   data: IUserData,
   friends: IFriend[],
   requests_friends: IFriend[],
   photos: string[],
}

interface IFriend {
   id: number,
   name: string,
   surname: string,
   img: string,
   username: string
}