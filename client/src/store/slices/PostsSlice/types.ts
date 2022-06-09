import { IPost } from "types/user";

export type StatusType = "ready" | "pending" | "create";

export interface IState {
   posts: IPost[],
   status: StatusType,
}