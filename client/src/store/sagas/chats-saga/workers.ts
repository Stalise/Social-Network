import { call, put, select } from "redux-saga/effects";

import { changeChatsStatusAction, addChatsAction, addChatAction, deleteChatAction, addMessageAction } from "store/slices/chats-slice";
import { changeAuthUserAction } from "store/slices/user-slice";
import { chatApi } from "api/chat-api";
import { apiResponsesMessage } from "data/constants/api";
import { sagasConstantsChat, sagaActionCreator } from "data/constants/saga";
import { IWorker } from "types/helpers";
import { IChat, IMessage } from "types/common";
import { ICreateMessagePayload, ICreateChatPayload, IGetMessagePayload } from "types/sagas/chat";

export function* workerGetChats() {
   yield put(changeChatsStatusAction("pending"));

   const response: string | IChat[] = yield call<any>(chatApi.getChats);

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));

      yield put(changeChatsStatusAction("ready"));
   } else if (response === apiResponsesMessage.unexpected) {
      yield put(changeChatsStatusAction("ready"));
   } else if (typeof (response) !== "string") {
      yield put(addChatsAction(response));

      yield put(changeChatsStatusAction("ready"));
   };
}

export function* workerCreateChat(data: IWorker<ICreateChatPayload>) {
   yield put(changeChatsStatusAction("create"));

   const { username } = yield select(store => store.userSlice.data);

   const response: string | IChat = yield call<any>(chatApi.createChat, [username, data.payload.person_username]);

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   } else if (response === apiResponsesMessage.unexpected) {
      yield put(changeChatsStatusAction("ready"));
      return;
   } else if (typeof (response) !== "string") {
      yield put(addChatAction(response));

      data.payload.navigate(`/chat/${response.id}`);

      yield put(changeChatsStatusAction("ready"));
   }
}

export function* workerDeleteChat(data: IWorker<number>) {

   const response: string = yield call<any>(chatApi.deleteChat, data.payload);

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   } else if (response === apiResponsesMessage.unexpected) {
      return;
   } else if (response === apiResponsesMessage.success) {
      yield put(deleteChatAction(data.payload));
   }
}

export function* workerCreateMessage(data: IWorker<ICreateMessagePayload>) {
   yield put(changeChatsStatusAction("message"));

   const response: string = yield call<any>(chatApi.createMessage, data.payload);

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   } else if (response === apiResponsesMessage.unexpected) {
      yield put(changeChatsStatusAction("ready"));
   } else if (response === apiResponsesMessage.success) {
      yield put(changeChatsStatusAction("ready"));
   }
}

export function* workerGetMessage(data: IWorker<IGetMessagePayload>) {
   const response: string | IMessage = yield call<any>(chatApi.getMessage, data.payload);

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   } else if (response === apiResponsesMessage.unexpected) {
      return;
   } else if (response === apiResponsesMessage.requestExpired) {
      yield put(sagaActionCreator<IGetMessagePayload>(sagasConstantsChat.SAGA_GET_MESSAGE, data.payload));
   } else if (typeof (response) !== "string") {
      // добавляем сообщение в чат, и вторым действием создаем опять лонгпуллинг
      yield put(addMessageAction({ chat_id: data.payload.chat_id, message: response }));

      yield put(sagaActionCreator<IGetMessagePayload>(sagasConstantsChat.SAGA_GET_MESSAGE, data.payload));
   }
}
