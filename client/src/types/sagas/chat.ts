import { NavigateFunction } from "react-router-dom";

export interface ICreateChatPayload {
   person_username: string,
   navigate: NavigateFunction,
}

export interface ICreateMessagePayload {
   text: string,
   date: string,
   chat_id: number,
}

export interface IGetMessagePayload {
   chat_id: number,
   controller: AbortController,
}
