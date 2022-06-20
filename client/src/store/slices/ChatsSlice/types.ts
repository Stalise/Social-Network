import { IChat, IMessage } from "types/common";

export type StatusType = "ready" | "pending" | "message";

export interface IState {
   status: StatusType,
   chats: IChat[],
}

export interface ICreateMessagePayload {
   chat_id: number,
   message: IMessage,
}