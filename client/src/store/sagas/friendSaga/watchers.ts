import { takeLatest } from "redux-saga/effects";

import { sagasConstantsFriend } from "mock/constants/saga";
import { workerCreateFriend, workerGetFriends,workerAcceptFriend, workerDeleteFriend } from "./workers";

export function* watcherGetFriends() {
   yield takeLatest(sagasConstantsFriend.SAGA_GET_FRIENDS, workerGetFriends);
}

export function* watcherCreateFriend() {
   yield takeLatest(sagasConstantsFriend.SAGA_CREATE_FRIEND, workerCreateFriend);
}

export function* watcherAcceptFriend() {
   yield takeLatest(sagasConstantsFriend.SAGA_ACCEPT_FRIEND, workerAcceptFriend);
}

export function* watcherDeleteFriend() {
   yield takeLatest(sagasConstantsFriend.SAGA_DELETE_FRIEND, workerDeleteFriend);
}
