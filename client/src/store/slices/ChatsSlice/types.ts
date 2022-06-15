import { IChat } from "types/common";

export type StatusType = "ready" | "pending";

export interface IState {
   status: StatusType,
   chats: IChat[],
}