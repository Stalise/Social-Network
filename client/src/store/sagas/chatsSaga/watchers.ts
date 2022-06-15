import { takeLatest } from "redux-saga/effects";

import { sagasConstantsChat } from "mock/constants/saga";
import { workerGetChats, workerCreateChat, workerDeleteChat } from "./workers";

export function* watcherGetChats() {
   yield takeLatest(sagasConstantsChat.SAGA_GET_CHATS, workerGetChats);
}

export function* watcherCreateChat() {
   yield takeLatest(sagasConstantsChat.SAGA_CREATE_CHAT, workerCreateChat);
}

export function* watcherDeleteChat() {
   yield takeLatest(sagasConstantsChat.SAGA_DELETE_CHAT, workerDeleteChat);
}
