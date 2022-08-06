import { IFriend } from "types/common";

export type StatusType = "ready" | "pending" | "create";

export interface IState {
   friends: IFriend[],
   status: StatusType,
}
