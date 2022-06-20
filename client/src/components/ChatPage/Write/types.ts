
export type FieldOverflowType = "hidden" | "auto";

export interface IPayloadCreateMessage {
   text: string,
   date: string,
   user_username: string,
   chat_id: number,
}