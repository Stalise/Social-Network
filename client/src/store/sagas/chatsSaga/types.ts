import { NavigateFunction } from "react-router-dom";

export interface IPayloadCreateChat {
   person_username: string,
   navigate: NavigateFunction,
}

export interface IPayloadCreateMessage {
   text: string,
   date: string,
   user_username: string,
   chat_id: number,
}

export interface IPayloadGetMessage {
   chat_id: number,
   controller: AbortController,
}
