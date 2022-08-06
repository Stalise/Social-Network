import { IUserData, IPost, IFriend, IPhoto } from "types/common";

export type StatusType = "ready" | "data";

export interface IState {
   status: StatusType,
   data: IUserData,
   posts: IPost[],
   friends: IFriend[]
   photos: IPhoto[],
}
