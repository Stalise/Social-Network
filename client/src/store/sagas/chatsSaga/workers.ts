import { call, put, select } from "redux-saga/effects";

import { changeChatsStatusAction, addChatsAction, addChatAction, deleteChatAction, addMessageAction } from "store/slices/ChatsSlice/ChatsSlice";
import { changeAuthUserAction } from "store/slices/UserSlice/UserSlice";
import { chatApi } from "api/chatApi/chatApi";
import { apiResponsesMessage } from "mock/constants/api";
import { sagasConstantsChat, sagaActionCreator } from "mock/constants/saga";
import { IWorker } from "types/helpers";
import { IChat, IMessage } from "types/common";
import { IPayloadCreateChat, IPayloadCreateMessage, IPayloadGetMessage } from "./types";

export function* workerGetChats() {
   const { username } = yield select(store => store.userSlice.data);

   const response: string | IChat[] = yield call<any>(chatApi.getChats, username);

   if (response === apiResponsesMessage.needAuth) yield put(changeAuthUserAction(false));
   else if (response === apiResponsesMessage.unexpected) return;

   if (typeof (response) !== "string") {
      yield put(addChatsAction(response));
   }
}

export function* workerCreateChat(data: IWorker<IPayloadCreateChat>) {
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

export function* workerCreateMessage(data: IWorker<IPayloadCreateMessage>) {
   yield put(changeChatsStatusAction("message"));

   const response: string = yield call<any>(chatApi.createMessage, data.payload);

   if (response === apiResponsesMessage.needAuth) yield put(changeAuthUserAction(false));
   else if (response === apiResponsesMessage.unexpected) {
      yield put(changeChatsStatusAction("ready"));
   }

   if (response === apiResponsesMessage.success) {
      yield put(changeChatsStatusAction("ready"));
   }
}

export function* workerGetMessage(data: IWorker<IPayloadGetMessage>) {
   const { chat_id, controller } = data.payload;
   const response: string | IMessage = yield call<any>(chatApi.getMessage, [chat_id, controller]);

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   }
   else if (response === apiResponsesMessage.unexpected) {
      return;
   }
   else if (response === apiResponsesMessage.requestExpired) {
      yield put(sagaActionCreator<IPayloadGetMessage>(sagasConstantsChat.SAGA_GET_MESSAGE, { chat_id, controller }));
   }
   else if (typeof (response) !== "string") {
      yield put(addMessageAction({ chat_id: data.payload.chat_id, message: response }));
      return put(sagaActionCreator<IPayloadGetMessage>(sagasConstantsChat.SAGA_GET_MESSAGE, { chat_id, controller }));
   }
}