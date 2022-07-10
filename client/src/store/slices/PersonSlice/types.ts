import { IUserData, IPost } from "types/common";

export type StatusType = "ready" | "data";

export interface IState {
   status: StatusType,
   data: IUserData,
   posts: IPost[],
   photos: string[],
}

// interface IFriend {
//    id: number,
//    name: string,
//    surname: string,
//    img: string,
//    username: string
// }
