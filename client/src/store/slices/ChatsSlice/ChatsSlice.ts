import { createSlice } from "@reduxjs/toolkit";

import { IState, StatusType } from './types';
import { IChat } from "types/common";

const initialState: IState = {
   status: "pending",
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
   },
});

export const {
   changeChatsStatusAction,
   addChatsAction,
   addChatAction,
   deleteChatAction,
} = chatsSlice.actions;

export default chatsSlice.reducer;