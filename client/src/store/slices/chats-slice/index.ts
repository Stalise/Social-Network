import { createSlice } from "@reduxjs/toolkit";

import { IState, StatusType, ICreateMessagePayload } from './types';
import { IChat } from "types/common";

const initialState: IState = {
   status: "ready",
   chats: [],
};

export const chatsSlice = createSlice({
   name: 'chats',
   initialState,
   reducers: {
      changeChatsStatusAction(state, { payload }: { payload: StatusType }) {
         state.status = payload;
      },
      addChatsAction(state, { payload }: { payload: IChat[] }) {
         state.chats = payload;
      },
      addChatAction(state, { payload }: { payload: IChat }) {
         state.chats.push(payload);
      },
      deleteChatAction(state, { payload }: { payload: number }) {
         state.chats = state.chats.filter(elem => elem.id !== payload);
      },
      addMessageAction(state, { payload }: { payload: ICreateMessagePayload }) {
         const chat = state.chats.filter(elem => elem.id === payload.chat_id)[0];
         chat.messages.push(payload.message);
      },
   },
});

export const {
   changeChatsStatusAction,
   addChatsAction,
   addChatAction,
   deleteChatAction,
   addMessageAction,
} = chatsSlice.actions;

export default chatsSlice.reducer;
