import { IPost } from "types/common";

export type StatusType = "ready" | "pending" | "create";

export interface IState {
   posts: IPost[],
   status: StatusType,
}