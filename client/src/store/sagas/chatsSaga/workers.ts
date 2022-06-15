import { call, put, select } from "redux-saga/effects";

import { addChatsAction, addChatAction, deleteChatAction } from "store/slices/ChatsSlice/ChatsSlice";
import { changeAuthUserAction } from "store/slices/UserSlice/UserSlice";
import { chatApi } from "api/chatApi";
import { apiResponsesMessage } from "mock/constants/api";
import { IWorker } from "types/helpers";
import { IChat } from "types/common";

interface IPayload {
   person_username: string,
   navigate: any,
}

export function* workerGetChats() {
   const { username } = yield select(store => store.userSlice.data);

   const response: string | IChat[] = yield call<any>(chatApi.getChats, username);

   if (response === apiResponsesMessage.needAuth) yield put(changeAuthUserAction(false));
   else if (response === apiResponsesMessage.unexpected) return;

   if (typeof (response) !== "string") {
      yield put(addChatsAction(response));
   }
}

export function* workerCreateChat(data: IWorker<IPayload>) {
   const { username } = yield select(store => store.userSlice.data);

   const response: string | IChat = yield call<any>(chatApi.createChat, [username, data.payload.person_username]);

   if (response === apiResponsesMessage.needAuth) yield put(changeAuthUserAction(false));
   else if (response === apiResponsesMessage.unexpected) return;

   if (typeof (response) !== "string") {
      yield put(addChatAction(response));
      data.payload.navigate(`/chat/${response.id}`);
   }
}

export function* workerDeleteChat(data: IWorker<number>) {

   const response: string = yield call<any>(chatApi.deleteChat, data.payload);

   if (response === apiResponsesMessage.needAuth) yield put(changeAuthUserAction(false));
   else if (response === apiResponsesMessage.unexpected) return;

   if (response === apiResponsesMessage.success) {
      yield put(deleteChatAction(data.payload));
   }
}